import spawn from "child_process";
import fs from "fs";

async function callPythonFunction(question) {
    const input = JSON.stringify(question);

    // Criar um arquivo temporário para armazenar o input
    const tempFilePath = path.join(__dirname, 'temp_input.json');
    fs.writeFileSync(tempFilePath, input);

    // Iniciar o processo Python
    const pythonProcess = spawn("python", ["src/Middleware/simplex.py", tempFilePath]);

    pythonProcess.stdin.write(input);
    pythonProcess.stdin.end();

    let result = "";

    // Ler a saída do processo Python
    pythonProcess.stdout.on("data", (data) => {
        result += data.toString();
    });

    // Lidar com erros
    pythonProcess.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
    });

    // Lidar com o término do processo
    pythonProcess.on("close", (code) => {
        if (code !== 0) {
            return res.status(500).json({ message: "Error processing input" });
        }

        try {
            const output = JSON.parse(result);

            // Atualizar question.answer com o output
            req.question.answer = output;
            next();
        } catch (error) {
            return res.status(500).json({ message: "Error parsing output" });
        }
    });
}

export default { callPythonFunction };