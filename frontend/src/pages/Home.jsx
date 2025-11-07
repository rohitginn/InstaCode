import { Button } from '@/Components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react'
import { RippleButton } from '@/Components/ui/ripple-button';
import CodeEditor from '@/Components/CodeEditor';
import Component from '@/Components/comp-354';
import { Highlighter } from '@/Components/ui/highlighter';
import { ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { saveProject } from '@/api/axios';

const Home = ({ userId, token }) => {
  const [htmlCode, setHtmlCode] = useState("<h1>Hello World!</h1>");
  const [cssCode, setCssCode] = useState("h1 { color: red; }");
  const [jsCode, setJsCode] = useState("console.log('Hello World!');");
  const [projectName, setProjectName] = useState("Project 1");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  }

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

  // const [dividerPosition, setDividerPosition] = useState(50);
  // const isDragging = useRef(false);

  // const handleMouseDown = () => (isDragging.current = true);
  // const handleMouseUp = () => (isDragging.current = false);

  // const handleMouseMove = (e) => {
  //   if (!isDragging.current) return;
  //   const newPosition = (e.clientX / window.innerWidth) * 100;
  //   if (newPosition > 20 && newPosition < 80) setDividerPosition(newPosition);
  // };

  return (
    <div
      className="w-full h-screen bg-gray-800 text-white flex flex-col select-none"

    >
      {/* Navbar */}
      <nav className="relative p-2 dark:text-white bg-gray-950">
        <div className="flex p-1 items-center justify-between">
          <div className="flex items-center">
            <img src="coding.png" alt="" className="w-7 h-7 ml-2" />
            <h1 className="text-xl text-white font-semibold ml-1.5">
              <Highlighter action='underline' color='#FF9800'><Link to="/">InstaCode</Link></Highlighter>
            </h1>
          </div>

          <div className="flex gap-3">
            <div>
              <input
                type="text"
                placeholder="Enter project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="mb-2 p-1 text-stone-300 bg-gray-800 mt-1 border-2 border-gray-400 focus:outline-none text-sm rounded-lg"
              />
            </div>

            <div className='font-inter'>
              <Component onClick={handleSave}/>
            </div>

            {!isLoggedIn ? (
              <>
                <Button className="cursor-pointer bg-gray-800 border-2 border-gray-600">
                  <Link to="/login">Login</Link>
                </Button>
              </>
            ) : (
              <Button className="cursor-pointer bg-gray-800 border-2 border-gray-600" onClick={handleLogout}>
                <Link to="">Logout</Link>
              </Button>
            )}

            {!isLoggedIn ? (
              <>
                <Button className="cursor-pointer bg-gray-800 border-2 border-gray-600">
                  <Link to="/signup">Get Started</Link> <ArrowRight />
                </Button>
              </>
            ) : (
              <Button className="cursor-pointer bg-gray-800 border-2 border-gray-600">
                <Link to="/profile">Profile</Link>
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Split Area */}
      <div className="">
        <div className="bg-gray-900 p-3 transition-all duration-100 ease-in-out">

          <h2 className="text-lg font-semibold">Code Editor</h2>
          <div className='flex-1 min-h-0'>
            <CodeEditor />
          </div>


        </div>

        {/* Divider */}
        {/* <div
          onMouseDown={handleMouseDown}
          className="w-1 bg-gray-600 cursor-col-resize hover:bg-blue-500 transition-colors"
          style={{
            position: 'absolute',
            left: `${dividerPosition}%`,
            top: 0,
            bottom: 0,
            zIndex: 10,
          }}
        ></div> */}
      </div>
    </div>
  );
};

export default Home;
