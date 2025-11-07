import { getUserProjects } from '@/api/axios';
import { LucidePencil, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Profile = ({ userId, token}) => {
    const [projects, setProjects] = useState([]);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await getUserProjects(userId,token);
                console.log(res.data);
                setProjects(Array.isArray(res.data) ? res.data : []);
            } catch (error) {
                toast.error("Failed to load projects");
            }
        };

        fetchProjects();
    }, [userId,token]);

    const handleEdit = () => {
        navigate(`/edit-profile/${projectId}`);
    }

    const handleDelete = async (projectId) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;
        try {
            await deleteProject(projectId, token);
            setProjects((prev) => prev.filter((p) => p._id !== projectId));
            toast.success("Project deleted successfully");
        } catch (error) {
            toast.error("Failed to delete project");
        }
    }

  return (
    <div className='max-w-4xl mx-auto px-6 py-8'>
        <h1 className='text-2xl font-bold mb-6'>Welcome, {username}</h1>
        {projects.length === 0 ? (
            <p>You have no saved projects</p>
        ) : (
            <div>
                <ul className='space-y-4'> 
                    {projects.map((project) => (
                        <li key={project._id} className='border rounded p-4 flex justify-between items-center'>
                            <div>
                                <h2 className='text-xl font-semibold'>{project.title || "Untitled Project"}</h2>
                                <p className='text-sm text-gray-500'>Last updated: {new Date(project.updatedAt).toLocaleDateString()}</p>
                            </div>

                            <div className='space-x-2'>
                                <button onClick={handleEdit} className='px-3 py-1 bg-gray-300 text-black/70 border border-gray-500'>
                                    <LucidePencil /> Edit
                                </button>

                                <button onClick={() => handleDelete(project._id)} className='px-3 py-1 bg-red-300 border border-red-500 text-white'>
                                    <Trash2 />
                                </button>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>
        )}
        
    </div>
  )
}

export default Profile