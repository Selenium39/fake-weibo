function sum(a, b) {
    return a + b
}

test('test sum', () => {
    const res = sum(10, 20)
    expect(res).toBe(30)
})

test('test sum1', () => {
    const res = sum(10, 20)
    expect(res).not.toBe(40)
})