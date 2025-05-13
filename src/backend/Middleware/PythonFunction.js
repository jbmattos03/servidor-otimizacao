import { spawn } from "child_process";

function callPythonFunction(question) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn("python", ["Python/simplex.py"]);
        let output = "";
        let errorOutput = "";

        pythonProcess.stdin.write(JSON.stringify(question));
        pythonProcess.stdin.end();

        pythonProcess.stdout.on("data", (data) => {
            output += data.toString();
        });

        pythonProcess.stderr.on("data", (data) => {
            errorOutput += data.toString();
        });

        pythonProcess.on("close", (code) => {
            if (code === 0) {
                try {
                    const result = JSON.parse(output);
                    console.log("Parsed result:", result);
                    resolve(result);
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                    reject(error);
                }
            } else {
                console.error("Python script error:", errorOutput);
                reject(new Error(errorOutput));
            }
        });

        pythonProcess.on("error", (error) => {
            reject(error);
        });
    });
}

export default callPythonFunction;