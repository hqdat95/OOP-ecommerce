class FormatResponse {
  format(req, res, next) {
    // Add a `success` method to the response object for formatting the response data
    res.success = (data, fields) => {
      let formattedData;

      switch (true) {
        case Array.isArray(data) && Array.isArray(fields):
          // If both data and fields are arrays, filter the data based on the specified fields
          formattedData = data.map((item) => {
            const filteredItem = {};
            for (const field of fields) {
              if (item[field] !== undefined) {
                filteredItem[field] = item[field];
              }
            }
            return filteredItem;
          });
          break;

        case Array.isArray(fields):
          // If only fields is an array, filter the data object based on the specified fields
          formattedData = fields.reduce((formattedData, field) => {
            if (data[field] !== undefined) {
              formattedData[field] = data[field];
            }
            return formattedData;
          }, {});
          break;

        default:
          // No filtering required, use the original data
          formattedData = data;
          break;
      }

      // Send the formatted response with a 200 status code and success flag
      return res.status(200).json({ success: true, data: formattedData });
    };
    next();
  }
}

export default new FormatResponse();
