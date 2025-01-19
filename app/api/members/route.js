import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
    try {
        const membersDir = path.join(process.cwd(), "public", "members");
        const files = await fs.readdir(membersDir);

        const imageFiles = files.filter(file =>
            /\.(jpg|jpeg|png|gif)$/i.test(file)
        );

        const members = await Promise.all(
            imageFiles.map(async (file) => {
                const name = path.parse(file).name;
                let memberData;

                try {
                    const dataPath = path.join(
                        process.cwd(),
                        "data",
                        "members",
                        `${name}.json`
                    );
                    const rawData = await fs.readFile(dataPath, "utf-8");
                    memberData = JSON.parse(rawData);
                } catch {
                    // Se não houver arquivo JSON, cria dados padrão
                    memberData = {
                        description: "Membro da Team Zona",
                        quotes: ["Ainda não tem pérolas registradas"],
                        status: "offline"
                    };
                }

                return {
                    id: name,
                    name: name,
                    image: file,
                    description: memberData.description,
                    quotes: memberData.quotes,
                    status: memberData.status,
                    video: memberData.video
                };
            })
        );

        return NextResponse.json(members);
    } catch (error) {
        console.error("Erro ao ler membros:", error);
        return NextResponse.json(
            { error: "Erro ao carregar membros" },
            { status: 500 }
        );
    }
} 