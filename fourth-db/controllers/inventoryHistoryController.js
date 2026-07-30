const invntryHistryModel = require('../models/inventoryHistoryModel');

exports.getAllInvntryHistry = async (req, res) => {
    const {search = '', page = 1, limit = 10, sort = 'newest'} = req.query;

    try {
        const result = await invntryHistryModel.getAllInvntryHistry(search, Number(page), Number(limit), sort);
        
        return res.status(200).json({
            success: true,
            data: result.rows,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                totalRecords: result.total,
                totalPages: Math.ceil(result.total / limit)
            }
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: 'Please try again later!'
        })
    }   
}