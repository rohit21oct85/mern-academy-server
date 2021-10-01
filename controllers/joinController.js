const waitList = require('../models/waitList')

const postWaitList = async (req, res, next) => {
      try {
            let data = req.body;
            const waitListData = new waitList(data);
            return await waitListData.save().then(result => {
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


const getWaitList = async (req, res, next) => {
      try {
           
            const waitLists = await waitList.find();
            res.json({
                  status: res.statusCode,
                  data: waitLists
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
      postWaitList,
      getWaitList
}