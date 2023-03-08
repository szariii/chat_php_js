//$(document).ready(function () {

let nameuser = prompt("Podja nazwe użytkownika")
let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
let lastUpdateTime = new Date().getTime()
let idoczekiwane = ""
let fontcolor = "#0000FF"



function scroll() {
    var $scrollbar1 = $("#scrollbar1");
    $scrollbar1.tinyscrollbar();
}

function scrollUpdate() {
    var $scrollbar1 = $("#scrollbar1");
    var scrollbar1 = $scrollbar1.data("plugin_tinyscrollbar");
    scrollbar1.update();
}




function restart() {
    window.location.reload(true)
}


async function start() {
    document.getElementById("inp").onkeydown = function (event) {
        if (event.key == "Enter") {
            val = document.getElementById("inp").value.toString()
            if (val.charAt(0) == "/" && val.charAt(1) == "n" && val.charAt(2) == "i" && val.charAt(3) == "c" && val.charAt(4) == "k") {
                tab = val.split(" ")
                console.log(tab)
                nameuser = tab[1]
            } else if (val.charAt(0) == "/" && val.charAt(1) == "c" && val.charAt(2) == "o" && val.charAt(3) == "l" && val.charAt(4) == "o" && val.charAt(5) == "r") {
                tab = val.split(" ")
                var reg = /^#([0-9a-f]{3}){1,2}$/i;
                console.log(reg.test(tab[1]))
                if (reg.test(tab[1]) == true) {
                    tabkacomment = Array.from(document.getElementsByClassName("comment"))
                    console.log(tabkacomment)
                    fontcolor = tab[1]
                    for (let j = 0; j < tabkacomment.length; j++) {
                        tabkacomment[j].style.color = fontcolor
                    }
                } else {
                    document.getElementById("tekst").innerHTML = document.getElementById("tekst").innerHTML + "<span style='color:#FF0000'>Składnia polecenia /color: /color [kolor] np. /color #FF0000</span><br/>"
                }
            } else if (val.charAt(0) == "/" && val.charAt(1) == "q" && val.charAt(2) == "u" && val.charAt(3) == "i" && val.charAt(4) == "t") {
                document.getElementById("calosc").style.display = "none"
                document.getElementById("komunikat").innerHTML = "<h1 style='text-align:center'>Opuściłeś czat</h1><br/><button onclick='restart()'><h2 style='text-align:center'>Dołącz ponownie</h2></button>"
            } else {
                let date = new Date()
                let hh = date.getHours()
                let mm = date.getMinutes()
                if (hh < 10) {
                    hh = "0" + hh
                }
                if (mm < 10) {
                    mm = "0" + mm
                }
                let timek = encodeURIComponent(hh + ":" + mm).toString()
                let userek = encodeURIComponent(nameuser).toString()
                console.log(date)
                wyslij(encodeURIComponent(val), userek, timek, randomColor)
            }

            document.getElementById("inp").value = ""
        }
    }
    // let prom = new Promise((resolve) => {
    //     let by = pobierzId()
    //     resolve(by)
    // })
    //let bla = await pobierzId()

    // async function dawajId(){
    //     return() => pobierzId()
    // }

    //await new Promise(res => { pobierzId() });
    scroll()
    await pobierzId()
}

function pobierzId() {
    const xhttp1 = new XMLHttpRequest();
    xhttp1.open("POST", "alp.php", true);
    xhttp1.onreadystatechange = function () {
        //console.log("bylo to tu")
        if (this.readyState == 4 && this.status == 200) {
            //console.log("bylo to tu")
            let json = JSON.parse(this.responseText);
            console.log(json);
            setTimeout(clean, 500, json[0][0])
            alp(parseInt(json[0][0]))
        }
    }

    xhttp1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp1.send("acc=id")
}

function clean(id) {
    console.log(id)
    const xhttp1 = new XMLHttpRequest();
    xhttp1.open("POST", "alp.php", true);
    console.log("weszlo w wyslij")
    xhttp1.onreadystatechange = function () {
        console.log("bylo to tu")
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText)
        }
    }
    console.log("no kurcze wchodzi")
    xhttp1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp1.send("acc=clean&id=" + encodeURIComponent(id));
}


function wyslij(text, user, timek, kolorek) {
    console.log(text)
    const xhttp1 = new XMLHttpRequest();
    xhttp1.open("POST", "alp.php", true);
    console.log("weszlo w wyslij")
    xhttp1.onreadystatechange = function () {
        console.log("bylo to tu")
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText)
            //let json = JSON.parse(this.responseText);

        }
    }
    console.log("no kurcze wchodzi")
    xhttp1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp1.send("acc=add&text=" + text + "&user=" + user + "&timek=" + timek + "&color=" + kolorek);

}

function alp(id) {
    send("alp.php", id)
}

function send(url, ostatnieId) {

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);

    console.log(ostatnieId)
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(this.responseText);
            console.log(json);
            if (json != "null") {
                // są dane - uaktualnij boxy
                console.log(document.getElementById("tekst").innerText)
                for (let i = 0; i < json.length; i++) {
                    document.getElementById("tekst").innerHTML = document.getElementById("tekst").innerHTML + "[" + json[i][2] + "]<span style='color:" + json[i][4] + "'>" + "<@" + json[i][1] + "></span><span class='comment' + style='color:" + fontcolor + "'>" + json[i][3] + "</span><br/>"
                    $('.comment').emoticonize();

                    if (json[i][0] > ostatnieId) {
                        ostatnieId = json[i][0]
                    }
                    document.getElementById("tekst").scrollTop = document.getElementById("tekst").scrollHeight;
                }


                scrollUpdate()

                console.log("sa")
                lastUpdateTime = new Date().getTime()
            }
            alp(ostatnieId)
        }
    }
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("lastid=" + ostatnieId);

}
