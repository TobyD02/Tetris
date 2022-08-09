/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas')

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d')

const score_div = document.getElementById('score display')

const cellSize = 20
const tickMax = 10

const Height = 32
const Width = 16

const types = {
    'line': {
        color: 'cyan',
        shape: [
            ['1'],
            ['1'],
            ['1'],
            ['1'],
        ]
    },
    'l': {
        color: 'orange',
        shape: [
            ['1', '0',],
            ['1', '0',],
            ['1', '1',],
        ]
    },
    'l_inv': {
        color: 'blue',
        shape: [
            ['0', '1'],
            ['0', '1'],
            ['1', '1'],
        ]   
    },
    't': {
        color: 'purple',
        shape: [
            ['0', '1', '0',],
            ['1', '1', '1',],
        ]   
    },
    'z': {
        color: 'red',
        shape: [
            ['0', '1', '1',],
            ['1', '1', '0',],
        ]  
    },
    'z_inv': {
        color: 'green',
        shape: [
            ['1', '1', '0',],
            ['0', '1', '1',],
        ]   
    },
    'block': {
        color: 'yellow',
        shape: [
            ['1', '1',],
            ['1', '1',],
        ]   
    }   
}