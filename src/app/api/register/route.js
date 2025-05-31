import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();

    const response = await fetch("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey: "your-api-key-here", // GANTI dengan API key kamu yang valid!
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || "Gagal daftar" },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, message: "Pendaftaran berhasil", data });
  } catch (error) {
    console.error("Error di /api/register:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
};
