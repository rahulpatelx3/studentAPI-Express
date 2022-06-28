const{register,login,getAllStudents,getSingleStudent,updateStudent, deleteStudent}=require('../controllers/student')
const {verifyToken,verifyTokenAndAdmin,verifyTokenAndAuthorization}=require('../middleware/verifyToken')
const router=require('express').Router();

router.post('/',register)
router.post('/login',login)

router.get('/',verifyTokenAndAdmin,getAllStudents)
router.get('/:id',verifyTokenAndAuthorization,getSingleStudent)
router.put('/:id',verifyTokenAndAuthorization,updateStudent)
router.delete('/:id',verifyTokenAndAuthorization,deleteStudent)

// router.post('/login',login)

module.exports=router;