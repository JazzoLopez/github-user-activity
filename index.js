const fetchApiGithub = async (username) => {
    const url = `https://api.github.com/users/${username}/events`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const username = process.argv[2];
console.log(`fetching data from ${username}....`);
fetchApiGithub(username)
    .then(data => {
        console.log(data.length > 0 ? data[0].created_at : 'No data');
        data.forEach(element => {
            console.log(`Type: ${element.type}`);
            console.log(`Repo: ${element.repo.name}`);
            console.log(`Date: ${element.created_at}`);
            console.log(`last commit message: ${element.payload.commits ? element.payload.commits[0].message : 'No message'}`);
            console.log('---------------------------------');
        });
    })
    .catch(error => {
        console.error(error);
    });