import isAuthenticatedUser from "@/backend/middlewares/auth";
import { NextResponse } from "next/server";
import dbConnect from "@/backend/config/dbConnect";
import Order from "@/backend/models/order";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    // Vérifier l'authentification
    await isAuthenticatedUser(req, NextResponse);
    await dbConnect();

    const orders = await Order.find({
      user: req?.user?._id,
      "orderItems.product": id,
    });

    let canReview = orders?.length >= 1 ? true : false;

    return NextResponse.json({ canReview }, { status: 200 });
  } catch (error) {}
}
