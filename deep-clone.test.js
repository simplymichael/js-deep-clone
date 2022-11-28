const expect = chai.expect;

// Possible object types
const domNode = document.createElement("div");
const date = new Date();
const fruits = ["Apples", "Bananas", "Oranges"];
const user = {
  name: "Paddy", 
  address: {
    town: "Lerum", 
    country: "Sweden"
  }
};
const complexObject = {
  name: "Complex Object",
  domNode,
  date,
  fruits,
  user,
};

describe('Deep Clone', function() {
  it("should return null when null is passed", () => {
    expect(deepClone(null)).to.be.null;
  });

  it("should return undefined when undefined is passed", () => {
    expect(deepClone(undefined)).to.be.undefined;
  });

  it("should return the boolean value when passed a boolean literal", () => {
    const f = false;
    const t = true;
    expect(deepClone(f)).to.be.false;
    expect(deepClone(t)).to.be.true
  });

  it("should return a boolean object whose value equals the value passed to the Boolean constructor when passed a boolean object", () => {
    const f = false;
    const t = true;
    expect(deepClone(new Boolean(f))).to.be.equal(true);
    expect(deepClone(new Boolean(t))).to.be.equal(true);
    expect(deepClone(new Boolean(f).valueOf())).to.be.equal(false);
    expect(deepClone(new Boolean(t).valueOf())).to.be.equal(true);
  });

  it("should return the number value when passed a number literal or a number object", () => {
    const num = 123;
    expect(deepClone(num)).to.be.equal(num);
    expect(deepClone(new Number(num))).to.be.equal(num);
  });

  it("should return the string value when passed a string literal or a string object", () => {
    const str = "A string literal";
    expect(deepClone(str)).to.be.equal(str);
    expect(deepClone(new String(str))).to.be.equal(str);
  });

  it("should return a new, but equivalent object when passed an HTML DOM node", () => {
    const clonedNode = deepClone(domNode);

    expect(clonedNode).not.to.be.equal(domNode);
    expect(domNode.nodeType).to.be.equal(clonedNode.nodeType);
    expect(domNode.nodeValue).to.be.equal(clonedNode.nodeValue);
    expect(domNode).to.be.deep.equal(clonedNode);
  });

  it("should return a new, but equivalent Date object when passed a Date object", () => {
    const clonedDate = deepClone(date);

    expect(clonedDate).not.to.be.equal(date);
    expect(date.valueOf()).to.be.equal(clonedDate.valueOf());
    expect(date).to.be.deep.equal(clonedDate);
  });

  it("should return a new, but equivalent object when passed an object literal", () => {
    const clonedUser = deepClone(user);

    expect(clonedUser).not.to.be.equal(user);
    expect(typeof clonedUser).to.be.equal("object");
    expect(Array.isArray(clonedUser)).to.be.false;
    expect(user.toString()).to.be.equal(clonedUser.toString());
    expect(user.address).not.to.be.equal(clonedUser.address);
    expect(user).to.be.deep.equal(clonedUser);
  });
  
  it("should return a new, but equivalent array when passed an array literal", () => {
    const clonedFruits = deepClone(fruits);

    expect(clonedFruits).not.to.be.equal(fruits);
    expect(typeof clonedFruits).to.be.equal("object");
    expect(Array.isArray(clonedFruits)).to.be.true;
    expect(fruits.length).to.be.equal(clonedFruits.length);
    expect(fruits).to.be.deep.equal(clonedFruits);
  });

  describe("Deep clone a complex object containing a mix of simple primitives and other nested objects", () => {
    it("should create a new copy of the original object", function() {
      const clone = deepClone(complexObject);
      expect((clone == complexObject)).to.be.equal(false);
      expect(Object.keys(complexObject).length).to.equal(Object.keys(clone).length);
      expect(complexObject).to.be.deep.equal(clone);
    });

    it("should copy the original object's primitive members by value", () => {
      const clone = deepClone(complexObject);

      for(const x in complexObject) {
        if(complexObject.hasOwnProperty(x)) {
          expect(clone).to.have.property(x);

          if(typeof complexObject[x] !== "object") {
            expect(clone[x]).to.be.equal(complexObject[x]);
          }
        }
      }
    });

    it("should create new copies of the original object's reference members: (arrays, objects, functions, etc)", () => {
      const clone = deepClone(complexObject);

      for(const x in complexObject) {
        if(complexObject.hasOwnProperty(x)) {
          expect(clone).to.have.property(x);

          if(typeof complexObject[x] === "object") {
            const complexProp = complexObject[x];
            const clonedProp = clone[x];

            expect(complexProp).not.to.be.equal(clonedProp);
            expect(complexProp).to.be.deep.equal(clonedProp);
          } 
        }
      }
    });
  })
});
