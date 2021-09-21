const crypto = require('crypto');
const testimonial = require('../models/testimonial')

const createTestimonial = async (req, res, next) => {
      try {
            let data = req.body;
            let randomText = crypto.randomBytes(6).toString('hex');
            data.photo = `https://i.pravatar.cc/250?u=${randomText}`;
            const testimonialData = new testimonial(data);
            return await testimonialData.save().then(result => {
                  res.status(res.statusCode).json({
                        result
                  })
                  res.end();
            }).catch(error => {
                  res.status(res.statusCode).json({
                        message: error.message,
                        error
                  })
                  res.end();
            })
      } catch (error) {
            res.status(res.statusCode).json({
                  message: error.message,
                  error
            })
            res.end();
      }
}

const updateTestimonial = async (req, res, next) => {
      let data = req.body;
      let id = req?.params?.testimonial_id
      // res.send(data); return;
      try {
            await testimonial.findByIdAndUpdate({
                  _id: id
            },{
                  $set: data
            })
            res.status(res.statusCode).json({
                  message: "content Updated",
            })
            res.end();
      } catch (error) {
            res.status(res.statusCode).json({
                  message: error.message,
                  error
            })
            res.end(); 
      }
}
const deleteTestimonial = async (req, res, next) => {
      let id = req?.params?.testimonial_id
      let active = req?.body?.status === 1 ? 0 : 1;
      // res.send(data); return;
      try {
            await testimonial.findByIdAndUpdate({
                  _id: id
            },{
                  $set: {
                        active: active
                  }
            })
            res.status(res.statusCode).json({
                  message: "content Deleted",
            })
            res.end();
      } catch (error) {
            res.status(res.statusCode).json({
                  message: error.message,
                  error
            })
            res.end(); 
      }
}


const getTestimonials = async (req, res, next) => {
      try {
           
            let active = req?.params?.status;
            const testimonials = await testimonial.find({active: active});
            res.json({
                  status: res.statusCode,
                  data: testimonials
            });
            res.end(); 
      } catch (error) {
            res.status(res.statusCode).json({
                  message: error.message,
                  error
            })
            res.end();
      }
}

module.exports = {
      createTestimonial,
      getTestimonials,
      updateTestimonial,
      deleteTestimonial
}