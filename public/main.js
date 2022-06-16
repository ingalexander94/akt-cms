const path = require("path");
const fs = require("fs");

const dirPath = path.join(__dirname, "../pages");
let postlist = []

const getPosts = () => {
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            return console.log("Failed to list contents of directory: " + err);
        }
        let ilist = [];
        files.forEach((file, i) => {
            let obj = {}
            let page
            fs.readFile(`${dirPath}/${file}`, "utf8", (_, contents) => {
                const getMetadataIndices = (acc, elem, i) => {
                    if (/^---/.test(elem)) {
                        acc.push(i)
                    }
                    return acc
                }
                const parseMetadata = ({lines, metadataIndices}) => {
                    if (metadataIndices.length > 0) {
                        let metadata = lines.slice(metadataIndices[0] + 1, metadataIndices[1])
                        metadata.forEach(line => {
                            obj[line.split(": ")[0]] = line.split(": ")[1]
                        })
                        return obj
                    }
                }
                const lines = contents.split("\n")
                const metadataIndices = lines.reduce(getMetadataIndices, [])
                const metadata = parseMetadata({lines, metadataIndices})
                page = {
                    name: metadata.name ? metadata.name : "No title given",
                }
                postlist.push(page)
                ilist.push(i)
                if (ilist.length === files.length) {
                    const sortedList = postlist.sort ((a, b) => {
                        return a.id < b.id ? 1 : -1
                    })
                    let data = JSON.stringify(sortedList)
                    fs.writeFileSync("src/pages.json", data)
                }
            })
        })
    })
    return 
}

getPosts()