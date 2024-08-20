import express from 'express';


const Logout = (req, res) => {
  try {
        res.cookie('jwt','',{maxAge:0})
        res.status(200).json({msg:"Logged out successfully"})
  } catch (error) {
        console.log("Error in logout controller",error.message)
        res.status(500).json({error:"Internal Server Error"})
  }
};


export default Logout;
