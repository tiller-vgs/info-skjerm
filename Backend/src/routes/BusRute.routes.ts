import {Router} from "express";
import {WeatherController, BusController, BusController} from "@controllers";

const router = Router();

router.get("/", BusController);
router.post("/", BusController);

export default router;
