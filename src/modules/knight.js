import Node from './node'
// console.log("Hello")
// console.log("Hello!")
// const KNIGHT_OFFSETS = [
//     [1, 2], [1, -2],
//     [2, 1], [2, -1],
//     [-1, 2], [-1, -2],
//     [-2, 1], [-2, -1]
//   ]

class Knight {

    
    constructor(location) {
        this.location = location;
        this.KNIGHT_OFFSETS = [
            [1, 2], [1, -2],
            [2, 1], [2, -1],
            [-1, 2], [-1, -2],
            [-2, 1], [-2, -1]
          ]
    }

    possibleLocations(location) {
        let returnArr = [];
        this.KNIGHT_OFFSETS.forEach((elem) => {
            let addedCoord = [+location[0] + +(elem[0]), +location[1] + +(elem[1])];
            returnArr.push(addedCoord);
        });

        returnArr = returnArr.filter((elem)=> {
            return !((elem[0] > 7 || elem[0] < 0) || (elem[1] < 0 || elem[1] > 7 ))
        })
        return returnArr

    }

    moveToLocation(location) {
        if (location[0] < 0 || location[0] > 7 || location[1] < 0 || location[1] > 7) {
            return null
        }
        console.log("called");
        const q = [];
        const node = new Node([this.location]);
        console.log(node);
        q.push(node);
        

        let currentNode;
        let count = 0;
        while (true) {
            
            currentNode = q.shift();
            const positionList = currentNode.positions;
            if (+positionList[positionList.length - 1][0] === +location[0] && +positionList[positionList.length - 1][1] === +location[1]) {

                break
            }

            this.possibleLocations(positionList[positionList.length - 1]).forEach((elem) => {
                const addList = [].concat(positionList);
                addList.push(elem);
                q.push(new Node(addList))
            });
            // break
            count++;
            }
        console.log(count)

        return currentNode;

    }
}

// const testKnight = new Knight([2,3]);


// console.log(testKnight.moveToLocation([4,5]));
export {Knight, Node};
//console.log(testBoard.board)