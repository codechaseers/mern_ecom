// It is a class for searching products "query" menas mongoshema.find() functuion
// and "querystr" is keyword -- ex product name ,category etc

const { json } = require("express");

class Apifeatures {
    constructor(query, querystr) {
        this.query = query
        this.querystr = querystr
    }
    serach() {
        const keyword = this.querystr.keyword ? {
            name: {
                $regex: this.querystr.keyword,
                $options: "i"
            }
        } : {}
        // console.log(keyword);
        this.query = this.query.find({ ...keyword })
        return this
    }
    //  filter function
    filter() {
        // make a coppy of querrystr using spred operator otherwise prev keyword will be change

        const querystrcopy = { ...this.querystr }
        // console.log(querystrcopy);

        // removing some field

        const removefields = ["keyword", "page", "limit"]

        // delete keyword ,page and limit formkeyword copy

        removefields.forEach((key) => delete querystrcopy[key])

        // filter for price and rating 

        let querystr = JSON.stringify(querystrcopy)
        querystr = querystr.replace(/\b(gt|gte|lt|lte\b)/g, (key) => `$${key}`)

        this.query = this.query.find(JSON.parse(querystr))
        // console.log(querystr);
        return this
    }
    pageination(result_per_page) {
        const currentpage = this.querystr.page || 1
        const skip=result_per_page *(currentpage-1)
        this.query=this.query.limit(result_per_page).skip(skip)
        return this
    }


}
module.exports = Apifeatures