//webpage title and searchbar
const topPg = document.querySelector(".fixedTop");
topPg.innerHTML = `
    <div class="row d-flex">
        <h1>Dictionary <span>📖</span></h1>
        <div class="col top">
            <form class="test">
                <input type="text" class="form-control searchbar" placeholder="Enter your word">
                <button type="submit" class="btn btn-outline-dark buttonsearch" onclick="searchtext(event)">Search <i class="fas fa-search"></i></button>
            </form>    
        </div>
    </div>
`;

//landing page caption and illustration
const middle = document.querySelector(".changing");
middle.innerHTML = `
    <div class="row caption d-flex flex-wrap">
        <div class="col d-flex">
            <p class="slogan">Dive deep into the world of endless words to advance your knowledge and learning with our <a href="#" class="Link">dictionary</a> 😉</p>
        </div>
        <div class="col">
            <img src="clip-reading-books.png" class="img-fluid illustration" alt="reading_book_illustration">
        </div>
    </div>
`;

//on click of search button searchtext function is called and checks if the value is blank if blank it tells the user to enter a input orelse fetches the result from the API 
function searchtext(event){
    event.preventDefault();
    const searchText = document.querySelector(".searchbar").value;
    if(searchText === ""){
        middle.innerHTML = `<p class="downtext">Invalid!😥 Please enter a word!!😇</p>`;
    }else{
        middle.innerHTML =`     
        <div class="loader"></div>
        `;
        async function dictionary(){
            try{
                const data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchText}`);
                const dataconvert = await data.json();
                if(dataconvert.title === "No Definitions Found"){
                    middle.innerHTML = `<p>Please type a valid keyword ! 😐</p>`;
                    return
                }
                // console.log(dataconvert);
                displayMeaning(dataconvert);
            }
            catch(err){
                middle.innerHTML = `<p class="downtext">Server is down for the moment. Please try again later. <br/> Sorry for the inconvenience 🙏</p>`;//if API server fails to fetch, it throws a error message with the help catch
            }
        }
        dictionary();
    }   
}

//after successful fetching it displays the results 🎉
function displayMeaning(data){
    data.forEach(datas => {
        middle.innerHTML =`
        <div class="row content">
            <div class="col d-flex flex-column justify-content-center">
                <p><b>Word:</b> ${datas.word} <br/> /${datas.phonetic === undefined? 'Phonetic Not Found 🤷‍♂️' : datas.phonetic}/</p>
                <audio controls><source src=${datas.phonetics[0].audio} type="audio/mp3"></audio><br/>
                <p><i>${datas.meanings[0].partOfSpeech === undefined? 'Parts of speech Not Found 🤷‍♂️' : datas.meanings[0].partOfSpeech}</i></p>
                <p><b>Defintion</b><br/> ${datas.meanings[0].definitions[0].definition === undefined? 'Not Found 🤷‍♂️' : datas.meanings[0].definitions[0].definition} <br/><br/> <b>Example</b> <br/> ${datas.meanings[0].definitions[0].example === undefined? 'Not Found 🤷‍♂️' : datas.meanings[0].definitions[0].example}</p>
                <p><b>Origin</b><br/> ${datas.origin === undefined? 'Not Found 🤷‍♂️' : datas.origin}</p>
            </div>
        </div>
        `;
        // <p><i>${(datas.meanings).length >= 1? datas.meanings[1].partOfSpeech : ''}</i></p>
        // <p>${(datas.meanings).length >= 1? datas.meanings[1].definitions[0].definition : ''}${(datas.meanings).length >= 1? datas.meanings[1].definitions[0].example : ''}</p>
        // <p><i>${(datas.meanings).length >= 1? datas.meanings[2].partOfSpeech : ''}</i></p>
    });
}

//footer part
const bottom = document.querySelector(".footer");
bottom.innerHTML = `
<p class="btm"><i class="fas fa-code footingbg"></i> with <i class="fas fa-heart footingbg"></i> by Sai Deepak</p>`;
