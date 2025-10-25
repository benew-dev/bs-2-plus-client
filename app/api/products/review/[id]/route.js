import dbConnect from "@/backend/config/dbConnect";
import isAuthenticatedUser from "@/backend/middlewares/auth";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const body = await req.bdoy();

    console.log("Body for review", body);

    console.log("Params", params);
    // Validation simple de l'ID MongoDB
    const { id } = params;
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
  } catch (error) {}
}
