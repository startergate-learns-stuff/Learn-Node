const call1 = () => {
    console.log('call1 called')
};

const call2 = () => {
    console.log('call2 called')
};

const call3 = () => {
    return 'hello';
};

call1();
call2();
console.log(call3());