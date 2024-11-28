const Job = require("../models/jobModel")
const mongoose = require("mongoose")

const getAllJobs = async (req,res) =>{
    try{
        const limit = parseInt(req.query._limit)
        const jobs = limit ? await Job.find({}).sort({createdAt:-1}).limit(limit)
        : await Job.find({}).sort({createdAt:-1});
        res.status(200).json(jobs)
    } catch (error){
        res.status(500).json({message:""})
    }
    
}

const addNewJob = async (req,res) =>{
    try{
        const newJob = await Job.create({...req.body})
        res.status(201).json(newJob)
    } catch(error){
        res.status(400).json({message:"Couldnt make job :("})
    }
};

const getJobById = async(req,res) =>{
    const {jobId} = req.params

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({ message: "Invalid job ID" });
    }

    try{
        const job = await Job.findById(jobId)
        if(job){
            res.status(200).json(job)
        } else {
            res.status(404).json({message:"Job not found", error:error.message})
        }
    
    } catch(error){
        res.status(500).json({message:"Failed to find job", error:error.message})
    }
}

const updateJob = async (req,res) =>{
    const {jobId} = req.params
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({ message: "Invalid job ID" });
      }
    try{
        const updatedJob = await Job.findOneAndUpdate(
            {_id:jobId},
            {...req.body},
            {new : true}
        )
        if(updatedJob){
            res.status(200).json(updatedJob)
        } else {
            res.status(404).json({message:"Jobbi no found"})
        }
    } catch(error){
        res.status(500).json({message:"Failed to update job", error:error.message})
    }

}

const deleteJob = async(req,res) =>{
    const {jobId } = req.params

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({ message: "Invalid user ID", error:error.message });
    }
    try{
        const deletedJob = await Job.findOneAndDelete({_id:jobId})
        if(deletedJob){
            res.status(204).json(deletedJob)
        } else {
            res.status(404).json({message:"Jobbi no found"})
        }
    } catch(error){
        res.status(500).json({message:"Failed to delete job", error:error.message})
    }
    
}

module.exports = {
    getAllJobs,
    addNewJob,
    getJobById,
    updateJob,
    deleteJob
}