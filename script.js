(() => {
    class Item{
        constructor(name, space = true, chance = 100){
            this.name = name;
            this.next = [];
            this.space = space;
            this.chance = chance / 100;
        }
        add(object){
            this.next.push(object);
        }
    }
    const i1 = new Item("բան");
    const i2 = new Item("բանը")
    const i3 = new Item("դու ասա");
    const i4 = new Item("է");
    const i5 = new Item("ն", false);
    const i6 = new Item("արա");
    const i7 = new Item("լինի");
    const i8 = new Item("որ");
    const i9 = new Item("դառնա");
    const i10 = new Item("ասա")
    const i11 = new Item("ը", false);

    i1.add(i2);
    i1.add(i6);
    i1.add(i3);
    i1.add(i7);
    i1.add(i9);
    i1.add(i11)

    i2.add(i1);
// i2.add(i3);
// i2.add(i10);

    i3.add(i4);

    i4.add(i5);
    i4.add(i10);

    i5.add(i1);

    i6.add(i8);

    i8.add(i2);

// i10.add(i3);


    function generate(){
        const maxLN = 10; //maximum naxadasutyun
        const minLN = 2;
        const arr = [i1, i2, i3];
        const length = minLN + Math.floor(Math.random() * (maxLN - minLN));
        let genText = "";
        function selectRandom(prev){
            const random = Math.floor(Math.random() * arr.length);
            return arr[random] === prev ? selectRandom(prev) : arr[random];
        }
        let prev = null;
        let start = true;
        for(let i = 0; i < maxLN; i++){
            let elm = selectRandom(prev);
            prev = elm;
            start = false;
            while(true){
                const n = elm.name;
                genText += (elm.space ? " " : "") + (start ? (n[0]?.toUpperCase() || '') + n.slice(1) : n);
                if(elm.next.length === 0){
                    break;
                }
                const rand = Math.floor(Math.random() * (elm.next.length + 1 ));
                elm = elm.next[rand] || new Item("", false);
            }
            if(Math.random() >= 0.5){
                if( Math.random() < 0.4){
                    genText += ":";
                    start = true;
                }
            }
            else{
                if(Math.random() < 0.5){
                    genText += ",";
                    i--;
                }
            }
        }
        return genText.replaceAll(",:", ":");
    }
    console.log(generate())
})()