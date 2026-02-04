const { get } = require("http");    

async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

async function getCard(){
    const setSizes = new Map([
        ["EB01",61],
        ["EB02",61], 
        //["EB04",41],
        ["PRB01",1],          
        ["PRB02",18],     
        ["OP01",121],
        ["OP02",121],
        ["OP03",123],
        ["OP04",119],
        ["OP05",119],
        ["OP06",119],
        ["OP07",119],
        ["OP08",119],
        ["OP09",119],
        ["OP10",119],
        ["OP11",119],
        ["OP12",119],
        ["OP13",120],
        ["OP14",120]                                         
    ])
    const starterSizes = new Map([
        ["ST01", 17], 
        ["ST02", 17],
        ["ST03", 17], 
        ["ST04", 17],
        ["ST05", 17], 
        ["ST06", 17],
        ["ST07", 17], 
        ["ST08", 15],
        ["ST09", 15], 
        ["ST10", 17],
        ["ST11", 5], 
        ["ST12", 17],
        ["ST13", 19], 
        ["ST14", 17],
        ["ST15", 5], 
        ["ST16", 5],                         
        ["ST17", 5], 
        ["ST18", 5],
        ["ST19", 5], 
        ["ST20", 5],
        ["ST21", 17], 
        ["ST22", 17],
        ["ST23", 5], 
        ["ST24", 5],
        ["ST25", 5], 
        ["ST26", 5],
        ["ST27", 5], 
        ["ST28", 5],
        //["ST29", 17]
    ])
    const promoSize = new Map([["P",92]])
    let url = "https://www.optcgapi.com/api/sets/card/OP01-001";

    switch(getRandomInt(3)){
            case 0://Sets

                let setID = getRandomInt(setSizes.size); // Random ID
                let randomSet = Array.from(setSizes.keys())[setID]; // Get the set Name
                let cardID = numberFormat(getRandomInt(setSizes.get(randomSet))+1); //format the card random card number
                url = `https://www.optcgapi.com/api/sets/card/${randomSet}-${cardID}`;
                 try {
                    const rawCard = await getData(url); // ← ADD AWAIT HERE
                    console.log("rawCard0:", rawCard); 
                    let card = rawCard[0]; //get only first card    
                    formatData(card);
                } catch (error) {
                    console.error("Failed to fetch card:", error);
                    getCard(); // Retry fetching a card
                }
                break;

            case 1: //Starter Deck
                let starterID = getRandomInt(starterSizes.size);
                let randomStarter = Array.from(starterSizes.keys())[starterID];
                let starterCardID = numberFormat(getRandomInt(starterSizes.get(randomStarter))+1);
                url = `https://www.optcgapi.com/api/decks/card/${randomStarter}-${starterCardID}`;
                try{
                    const rawCard = await getData(url);
                    let card = rawCard[rawCard.length -1];
                    console.log("rawCard1:", rawCard);
                    formatData(card);
                }catch (error) {
                    console.error("Failed to fetch card:", error);
                    getCard();
                }
                break;
            case 2://Promo
                let promoCardID = numberFormat(getRandomInt(promoSize.get("P"))+1);
                url = `https://www.optcgapi.com/api/promos/card/P-${promoCardID}`;
                try{
                    const rawCard = await getData(url);
                    let card = rawCard[0];
                    console.log("rawCard2:", rawCard);
                    formatData(card);
                }catch (error) {
                    console.error("Failed to fetch card:", error);
                    getCard();
                }
                break;
    }
}
