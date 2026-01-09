import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Asset } from '../models/asset.model.js';

const createAsset = asyncHandler(async (req, res) => {
    const { name, category, content } = req.body;

    if (!name || !category || !content) {
        throw new ApiError(400, "All fields are required to create an asset");
    }

    const asset = await Asset.create({
        name,
        category,
        content,
        assignedTo: req.user._id 
    });

    return res.status(201).json(
        new ApiResponse(201, asset, "Asset created successfully by Admin")
    );
});

const getAllAssets = asyncHandler(async (req, res) => {
    let assets;

    if (req.user.role === "admin") {
        assets = await Asset.find().populate("assignedTo", "username email");
    } else {
        assets = await Asset.find({ assignedTo: req.user._id });
    }

    return res.status(200).json(
        new ApiResponse(200, assets, "Assets fetched successfully")
    );
});

const updateAsset = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, content, status } = req.body;

    const asset = await Asset.findById(id);

    if (!asset) {
        throw new ApiError(404, "Asset not found");
    }

    const isAdmin = req.user.role === "admin";
    const isAssigned = asset.assignedTo?.toString() === req.user._id.toString();

    if (!isAdmin && !isAssigned) {
        throw new ApiError(403, "You do not have permission to update this asset");
    }

    const updatedAsset = await Asset.findByIdAndUpdate(
        id,
        { $set: { name, content, status } },
        { new: true, runValidators: true }
    );

    return res.status(200).json(
        new ApiResponse(200, updatedAsset, "Asset updated successfully")
    );
});

const deleteAsset = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (req.user.role !== "admin") {
        throw new ApiError(403, "Only admins can delete assets");
    }

    const asset = await Asset.findByIdAndDelete(id);

    if (!asset) {
        throw new ApiError(404, "Asset not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Asset deleted successfully")
    );
});

const getAssetById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const asset = await Asset.findById(id).populate("assignedTo", "username email");

    if (!asset) {
        throw new ApiError(404, "Asset not found");
    }

    if (req.user.role !== "admin" && asset.assignedTo?.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized access to this asset");
    }

    return res.status(200).json(new ApiResponse(200, asset, "Asset retrieved successfully"));
});

export { 
    createAsset, 
    getAllAssets, 
    updateAsset, 
    deleteAsset,
    getAssetById
};