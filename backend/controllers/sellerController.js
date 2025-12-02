import Seller from '../models/sellerModel.js';

// @desc    Submit new seller application
// @route   POST /api/sellers
// @access  Public
export const submitSellerApplication = async (req, res) => {
  try {
    console.log('📝 Received seller application:', req.body);
    const sellerData = req.body;
    
    // Check if email already exists
    const existingSeller = await Seller.findOne({ email: sellerData.email });
    if (existingSeller) {
      console.log('⚠️ Email already exists:', sellerData.email);
      return res.status(400).json({
        success: false,
        message: 'An application with this email already exists'
      });
    }

    console.log('💾 Creating new seller document...');
    const seller = new Seller(sellerData);
    await seller.save();
    
    console.log('✅ Seller saved successfully:', seller._id);

    res.status(201).json({
      success: true,
      message: 'Seller application submitted successfully',
      data: seller
    });
  } catch (error) {
    console.error('❌ Error submitting seller application:', error);
    console.error('❌ Full error details:', error.stack);
    console.error('❌ Request body:', req.body);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      console.error('❌ Validation errors:', errors);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }
    
    if (error.code === 11000) {
      console.error('❌ Duplicate key error:', error.keyValue);
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }
    
    console.error('❌ General error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get all seller applications (with pagination and filtering)
// @route   GET /api/sellers
// @access  Private (Admin)
export const getAllSellers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const search = req.query.search;

    // Build query
    const query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { contactPerson: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const sellers = await Seller.find(query)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('reviewedBy', 'name email');

    const total = await Seller.countDocuments(query);

    res.json({
      success: true,
      data: sellers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching sellers:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching sellers'
    });
  }
};

// @desc    Get seller application by ID
// @route   GET /api/sellers/:id
// @access  Private (Admin)
export const getSellerById = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id)
      .populate('reviewedBy', 'name email')
      .populate('adminNotes.addedBy', 'name email');

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: 'Seller application not found'
      });
    }

    res.json({
      success: true,
      data: seller
    });
  } catch (error) {
    console.error('Error fetching seller:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid seller ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while fetching seller'
    });
  }
};

// @desc    Update seller application status
// @route   PATCH /api/sellers/:id/status
// @access  Private (Admin)
export const updateSellerStatus = async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;
    const sellerId = req.params.id;

    // Validate status
    if (!['pending', 'under_review', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(404).json({
        success: false,
        message: 'Seller application not found'
      });
    }

    // Update status
    seller.status = status;
    seller.reviewedAt = new Date();
    seller.reviewedBy = req.user._id; // Assuming user info is available from auth middleware

    // Add rejection reason if rejected
    if (status === 'rejected' && rejectionReason) {
      seller.rejectionReason = rejectionReason;
    } else if (status !== 'rejected') {
      seller.rejectionReason = undefined;
    }

    await seller.save();

    res.json({
      success: true,
      message: `Seller application ${status} successfully`,
      data: seller
    });
  } catch (error) {
    console.error('Error updating seller status:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid seller ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating status'
    });
  }
};

// @desc    Add admin note to seller application
// @route   POST /api/sellers/:id/notes
// @access  Private (Admin)
export const addSellerNote = async (req, res) => {
  try {
    const { note } = req.body;
    const sellerId = req.params.id;

    if (!note || note.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Note content is required'
      });
    }

    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(404).json({
        success: false,
        message: 'Seller application not found'
      });
    }

    seller.adminNotes.push({
      note: note.trim(),
      addedBy: req.user._id, // Assuming user info is available from auth middleware
      addedAt: new Date()
    });

    await seller.save();

    res.status(201).json({
      success: true,
      message: 'Note added successfully',
      data: seller
    });
  } catch (error) {
    console.error('Error adding seller note:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid seller ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while adding note'
    });
  }
};

// @desc    Update seller application
// @route   PUT /api/sellers/:id
// @access  Private (Admin)
export const updateSeller = async (req, res) => {
  try {
    const sellerId = req.params.id;
    const updateData = req.body;

    // Remove fields that shouldn't be updated directly
    delete updateData.status;
    delete updateData.submittedAt;
    delete updateData.reviewedAt;
    delete updateData.reviewedBy;

    const seller = await Seller.findByIdAndUpdate(
      sellerId,
      updateData,
      { new: true, runValidators: true }
    ).populate('reviewedBy', 'name email');

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: 'Seller application not found'
      });
    }

    res.json({
      success: true,
      message: 'Seller application updated successfully',
      data: seller
    });
  } catch (error) {
    console.error('Error updating seller:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid seller ID'
      });
    }

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating seller'
    });
  }
};

// @desc    Delete seller application
// @route   DELETE /api/sellers/:id
// @access  Private (Admin)
export const deleteSeller = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: 'Seller application not found'
      });
    }

    await Seller.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Seller application deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting seller:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid seller ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while deleting seller'
    });
  }
};

// @desc    Get seller statistics
// @route   GET /api/sellers/stats
// @access  Private (Admin)
export const getSellerStats = async (req, res) => {
  try {
    const stats = await Seller.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalSellers = await Seller.countDocuments();
    const thisMonth = await Seller.countDocuments({
      submittedAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      }
    });

    const statusStats = stats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        total: totalSellers,
        thisMonth,
        pending: statusStats.pending || 0,
        underReview: statusStats.under_review || 0,
        approved: statusStats.approved || 0,
        rejected: statusStats.rejected || 0
      }
    });
  } catch (error) {
    console.error('Error fetching seller stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics'
    });
  }
};

// @desc    Check application status by email
// @route   GET /api/sellers/check/:email
// @access  Public
export const checkApplicationStatus = async (req, res) => {
  try {
    const { email } = req.params;
    
    const seller = await Seller.findOne({ email }).select('status submittedAt companyName reviewedAt');
    
    if (!seller) {
      return res.status(404).json({
        success: false,
        message: 'No application found with this email'
      });
    }

    res.json({
      success: true,
      data: seller
    });
  } catch (error) {
    console.error('Error checking application status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while checking status'
    });
  }
};
