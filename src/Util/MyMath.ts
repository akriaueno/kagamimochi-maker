export class MyMath {
    static getUniform(a: number=0.0, b:number=1.0) {
        // https://www.ishikawa-lab.com/montecarlo/4shou.html
        return a + (b-a) * g.game.random.generate()
    }

    static getNormal(mu: number=0.0, sigma: number=1.0) {
        // https://omitakahiro.github.io/random/random_variables_generation.html
        const z = Math.sqrt(-2.0 * Math.log(MyMath.getUniform())) * Math.sin(2.0 * Math.PI * MyMath.getUniform())
        return mu + sigma*z
    }

    static sigmoid(x: number, a: number=1.0, b:number =0.0) {
        return 1 / (1+ a * Math.exp(-x + b))
    }
}