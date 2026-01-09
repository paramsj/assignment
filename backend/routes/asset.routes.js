import { Router } from "express";
import { getAllAssets, createAsset,  getAssetById, updateAsset, deleteAsset } from "../controllers/asset.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();
router.use(verifyJWT); 
router.route("/").get(getAllAssets);
router.route("/:id").get(getAssetById);
router.route("/").post(authorizeRoles("admin"), createAsset);
router.route("/:id").delete(authorizeRoles("admin"), deleteAsset);
router.route("/:id").patch(updateAsset);

export default router;