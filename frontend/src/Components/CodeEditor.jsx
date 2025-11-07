import React, { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { autocompletion } from '@codemirror/autocomplete';
import { closeBrackets } from '@codemirror/autocomplete';
import { oneDark } from '@uiw/react-codemirror';
import Split from 'react-split';
import './splitter.css';
import { saveProject } from '@/api/axios';
import toast from 'react-hot-toast';

const CodeEditor = ({userId, token}) => {
    const [htmlCode, setHtmlCode] = useState("<h1>Hello World!</h1>");
    const [cssCode, setCssCode] = useState("h1 { color: red; }");
    const [jsCode, setJsCode] = useState("console.log('Hello World!');");
    const [projectName, setProjectName] = useState("Project 1");

    const runCode = () => {
        const iframe = document.getElementById("output-frame");
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        const finalCode = `
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}</script>
        </body>
      </html>
    `;
        doc.open();
        doc.write(finalCode);
        doc.close();
    };

    const handleSave = async () => {
    if (!projectName) {
      toast.error("Please enter a project name");
      return;
    }
    try {
      await saveProject(
        {
          userId,
          projectName,
          files: { html: htmlCode, css: cssCode, js: jsCode },
        },
        token
      );
      toast.success("Project saved successfully");
    } catch (error) {
      toast.error("Failed to save project");
      console.log(error);

    }
  }

    return (
        <div className="h-screen w-full bg-gray-900 text-white ">
            <Split
                className="flex h-full w-full"
                sizes={[50,50]}
                minSize={200}
                gutterSize={8}
            >
                {/* === Left: Code Editors === */}
                <div className="flex flex-col p-1 overflow-hidden">
                    <Split
                        direction="vertical"
                        className="split-vertical flex-1 overflow-hidden"
                        sizes={[33, 33, 34]}
                        minSize={100}
                        gutterSize={6}
                    >
                        {/* HTML */}
                        <div className="flex mb-2 flex-col overflow-hidden">
                            <h2 className="text-md font-semibold mb-2">HTML</h2>
                            <div className="flex-1 border border-gray-700 rounded overflow-hidden">
                                <CodeMirror
                                    value={htmlCode}
                                    height="100%"
                                    theme={oneDark}
                                    extensions={[html(), closeBrackets(), autocompletion()]}
                                    onChange={(value) => setHtmlCode(value)}
                                />
                            </div>
                        </div>

                        {/* CSS */}
                        <div className="flex flex-col mt-2 mb-2 overflow-hidden">
                            <h2 className="text-md font-semibold mb-2">CSS</h2>
                            <div className="flex-1 border border-gray-700 rounded overflow-hidden">
                                <CodeMirror
                                    value={cssCode}
                                    height="100%"
                                    theme={oneDark}
                                    extensions={[css(), closeBrackets(), autocompletion()]}
                                    onChange={(value) => setCssCode(value)}
                                />
                            </div>
                        </div>

                        {/* JavaScript */}
                        <div className="flex flex-col mt-2 overflow-hidden">
                            <h2 className="text-md font-semibold mb-2">JavaScript</h2>
                            <div className="flex-1 border border-gray-700 rounded overflow-hidden">
                                <CodeMirror
                                    value={jsCode}
                                    height="100%"
                                    theme={oneDark}
                                    extensions={[javascript(), closeBrackets(), autocompletion()]}
                                    onChange={(value) => setJsCode(value)}
                                />
                            </div>
                        </div>
                    </Split>
                    <div className='p-3 0 border-t border-gray-700'>

                    <button
                        onClick={runCode}
                        className=" mt-5 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded self-start"
                    >
                        Run Code
                    </button>
                    </div>
                </div>

                {/* === Right Output === */}
                
                <div className="p-3 bg-white text-black flex flex-col overflow-hidden">
                    <h2 className="text-lg font-semibold mb-2">Output</h2>
                    <iframe
                        id="output-frame"
                        className="flex-1 w-full border rounded bg-white"
                        title="Output"
                    ></iframe>
                </div>
            </Split>
        </div>
    );

};

export default CodeEditor;
