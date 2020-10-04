import React, { ChangeEvent } from "react";

export interface CalculatorState {
    totalPrice: number;
    objectsPerDay: number;
    numberOfDays: number;
    pricePerObject: number;
}

export interface CalculatorProperties {
    defaultNumberOfDays: number;
    defaultObjectsPerDay: number;
}

export class Calculator extends React.Component<CalculatorProperties, CalculatorState> {
    p0 = 0.9;
    percent = 0.05;
    basePrice = 50;

    constructor(props: CalculatorProperties) {
        super(props);
        this.state = this.calculatePrice(props.defaultNumberOfDays, props.defaultObjectsPerDay);
    }

    render() {
        return(
            <form>
                <div>
                    <label>Objekte/Tag: </label>
                    <input type="number" name={'opd'} value={this.state.objectsPerDay} onChange={(e) => this.updateStateFromEvent(e)}/>
                </div>
                <div>
                    <label>Anzahl Einsatz-Tage: </label>
                    <input type="number" name={'nod'} value={this.state.numberOfDays} onChange={(e) => this.updateStateFromEvent(e)}/>
                </div>
                <h2>{this.state.totalPrice.toFixed(2)} CHF</h2>
                <h2>{this.state.pricePerObject.toFixed(2)} CHF / Einsatz</h2>
            </form>
        )
    }

    private updateStateFromEvent(e: ChangeEvent<HTMLInputElement>) {
        let opd: number;
        let nod: number;
        if(e.target.name === 'opd') {
            opd = +e.target.value;
            nod = this.state.numberOfDays;
        } else {
            opd = this.state.objectsPerDay;
            nod = +e.target.value;
        }
        this.setState(this.calculatePrice(nod, opd));
    }

    private calculatePrice(nod: number, opd: number): CalculatorState {
        const newPrice = this.basePrice + this.p0 * opd * this.calculateFactor(0, nod);
        const pricePerObject = newPrice / (nod * opd)
        return {
                totalPrice: newPrice,
                objectsPerDay: opd,
                numberOfDays: nod,
                pricePerObject: pricePerObject
            };
    }

    calculateFactor(n: number, totalDays: number): number {
        if(n < totalDays) {
            return Math.pow((1 - this.percent), n) + this.calculateFactor(n+1, totalDays);
        }
        else {
            return 0;
        }
    }
}