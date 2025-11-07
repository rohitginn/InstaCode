import { Project } from "../models/project.models.js";

export const createProject = async (req, res) => {
    const { userId, projectName, files } = req.body;
    if (!projectName || !files) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const project = await Project.create({ userId, projectName, files });
    res.status(201).json("Project created successfully");
    } catch (error) {
        res.status(500).json({ message: "Failed to create project", error: error.message });
    }
    
};

export const getProject = async (req, res) => {
    try {
        const projects = await Project.find(req.params.id).populate('userId', 'username');
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Failed to get projects", error: error.message });
    }
};

export const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: "Failed to update project", error: error.message });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        await Project.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete project", error: error.message });
    }
};