class Burger {
    constructor() {
        this.property = [];
        this.cost = 0;
        this.ccal = 0;

        this.createBurger();
        this.chooseSize();
        this.sumCost();
        this.sumCcal();
    }

    createBurger() {
        let adds = document.getElementsByName('burger-adds');
        let burgerFeatures = [
            {add: 'cheese', cost: 10, calories: 20},
            {add: 'salad', cost: 20, calories: 5},
            {add: 'potato', cost: 15, calories: 10},
            {add: 'sauce', cost: 15, calories: 0},
            {add: 'mayo', cost: 20, calories: 5},
        ];
        for (let i = 0; i < adds.length; i++) {
            if (adds[i].checked) {
                let add = adds[i].value;
                for (let k = 0; k < burgerFeatures.length; k++) {
                    if (burgerFeatures[k]['add'] == add) {
                        this.property.push(burgerFeatures[k]);
                    }
                }
            }
        }
        //console.log(this.property)
        return this.property;
    }

    chooseSize() {
        let burgerSize = [
            {size: 'small', cost: 50, calories: 20},
            {size: 'big', cost: 100, calories: 40},
        ];
        let sizes = document.getElementsByName('burger-size');
        for (let i = 0; i < sizes.length; i++) {
            if (sizes[i].checked) {
                let size = sizes[i].value;
                for (let k = 0; k < burgerSize.length; k++) {
                    if (burgerSize[k]['size'] == size) {
                        this.property.push(burgerSize[k]);
                    }
                }
            }
        }
        //console.log(this.property);
        return this.property;
    }

    sumCost() {
        for (let i = 0; i < this.property.length; i++) {
            this.cost += this.property[i]['cost'];
        }
        return this.cost;
    }

    sumCcal() {
        for (let i = 0; i < this.property.length; i++) {
            this.ccal += this.property[i]['calories'];
        }
        return this.ccal;
    }
}

document.getElementById('choice').addEventListener('click', () => {
    let userBurger = new Burger;
    userBurger.createBurger;
    userBurger.chooseSize;
    userBurger.sumCost;
    userBurger.sumCcal;
    document.getElementById('rez').innerHTML = userBurger.cost + ' рублей';
    document.getElementById('rezz').innerHTML = userBurger.ccal + ' калорий';
})