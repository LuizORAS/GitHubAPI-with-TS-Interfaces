const users = [];
async function fetchUser(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}`);
    const user = await response.json();
    if (user.message) {
        console.log("USUÁRIO NÃO ENCONTRADO");
    }
    else {
        users.push(user);
        console.log(`O usuário ${user.login} foi salvo.\n` +
            `\nid: ${user.id}` +
            `\nlogin: ${user.login}` +
            `\nNome: ${user.name}` +
            `\nBio: ${user.bio}` +
            `\nRepositórios públicos: ${user.public_repos}`);
    }
}
async function showUser(userName) {
    const user = users.find(user => user.login === userName);
    if (typeof user === 'undefined') {
        console.log('USUÁRIO NÃO ENCONTRADO!');
    }
    else {
        const response = await fetch(user.repos_url);
        const repos = await response.json();
        let message = `id: ${user.id}\n` +
            `\nlogin: ${user.login}` +
            `\nNome: ${user.name}` +
            `\nBio: ${user.bio}` +
            `\nRepositórios públicos: ${user.public_repos}`;
        repos.forEach(repo => {
            message += `\nNome: ${repo.name}` +
                `\nDescrição: ${repo.description}` +
                `\nEstrelas: ${repo.stargazers_count}` +
                `\nÉ um fork: ${repo.fork ? 'Sim' : 'Não'}\n`;
        });
        console.log(message);
    }
}
function showAllUsers() {
    let message = `Usuários:\n`;
    users.forEach((user) => {
        message += `\n=> ${user.login}`;
    });
    console.log(message);
}
function showAllRepos() {
    const reposTotal = users.reduce((accum, user) => accum + user.public_repos, 0);
    console.log(`O grupo possui um total de ${reposTotal} repositórios públicos!`);
}
function showTopFive() {
    const TopFive = users.slice().sort((a, b) => b.public_repos - a.public_repos).slice(0, 5);
    let message = "Top Usuários com mais repositórios públicos: \n";
    TopFive.forEach((user, index) => {
        message += `\n${index + 1} - ${user.login}: ${user.public_repos} repositórios`;
    });
    console.log(message);
}
