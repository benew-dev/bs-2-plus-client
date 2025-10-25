import dbConnect from "@/backend/config/dbConnect";
import isAuthenticatedUser from "@/backend/middlewares/auth";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    // Validation simple de l'ID MongoDB
    const { id } = await params;
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product ID format",
        },
        { status: 400 },
      );
    }

    // Vérifier l'authentification
    await isAuthenticatedUser(req, NextResponse);

    // Connexion DB
    await dbConnect();

    const body = await req.json();
    const reviewData = body.reviewData;
  } catch (error) {}
}
