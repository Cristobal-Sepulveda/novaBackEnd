const { 
    OrdenDeReparto, 
    Abonos,
    DescuentoRut,
    Descuentos,
    Efectivo,
    Transbank,
    Transferencias,
    Vales,
    Gastos
    } = require('../../db.js');

const { Op } = require('sequelize');

const updateAbono = async (req, res, next) => {
    const { id } = req.params;
    const { abono } = req.body;
    try {
        const orden = await OrdenDeReparto.findByPk(id);
        const metodoPago = await orden.getMetodoPagos();
        const abonos = await Abonos.findOne({
            where: {
                fk_MetodoPagosID: metodoPago[0].id
            }
        })

        await abonos.update({
            monto: abono + Number(abonos.monto)
        })
        
        res.json({
            message: 'Abono actualizado',
            data: abonos
        })
    } catch (error) {
        next(error);
    }
}

const getAllMetodoPagosInOrdenDeRepartoBetweenDates = async (req, res, next) => {
    const { date1, date2 } = req.params;
    try {

        let ordenes

        if( !date2 || date2 === 'undefined' || date2 === 'null' ) {

            ordenes = await OrdenDeReparto.findAll({
                where: {
                    fecha: date1
                }
            })
        } else {
            ordenes = await OrdenDeReparto.findAll({
                where: {
                    fecha: {
                        [Op.between]: [date1, date2]
                    }
                }
            })
        }

        const ordenesWithMetodoPagos = await Promise.all(ordenes.map(async (orden) => {
            const metodoPago = await orden.getMetodoPagos();
            
            const descuentoRut = await DescuentoRut.findOne({
                where: {
                    fk_MetodoPagosID: metodoPago[0].id
                }
            })

            const descuentos = await Descuentos.findOne({
                where: {
                    fk_MetodoPagosID: metodoPago[0].id
                }
            })

            const transbank = await Transbank.findOne({
                where: {
                    fk_MetodoPagosID: metodoPago[0].id
                }
            })

            const transferencias = await Transferencias.findOne({
                where: {
                    fk_MetodoPagosID: metodoPago[0].id
                }
            })


            const sumaAbonos = await Abonos.sum('monto', {
                where: {
                    fk_MetodoPagosID: metodoPago[0].id
                }
            })

            const contabilidadRecargas = await orden.getContabilidadRecarga();

            const efectivo = await Efectivo.findOne({
                where: {
                    fk_MetodoPagosID: metodoPago[0].id
                }
            })

            const vales = await Vales.findOne({
                where: {
                    fk_MetodoPagosID: metodoPago[0].id
                }
            })

            return {
                sumaAbonos,
                contabilidadRecargas,
                efectivo,
                vales,
                descuentoRut,
                descuentos,
                transbank,
                transferencias,
            }
        }))

        const sumaSobrantes = ordenes.reduce((acc, curr) => {
            return Number(acc) + Number(curr.sobrante)
        }, 0)

        const sumaTotalAbonos = ordenesWithMetodoPagos.reduce((acc, curr) => {
            return acc + curr.sumaAbonos
        }, 0)

        const sumaTotalRecargas = ordenesWithMetodoPagos.reduce((acc, curr) => {
            return {
                ventas5kg: Number(acc.ventas5kg) + Number(curr.contabilidadRecargas.ventas5kg),
                recaudacion5kg: Number(acc.recaudacion5kg) + Number(curr.contabilidadRecargas.recaudacion5kg),
                ventas11kg: Number(acc.ventas11kg) + Number(curr.contabilidadRecargas.ventas11kg),
                recaudacion11kg: Number(acc.recaudacion11kg) + Number(curr.contabilidadRecargas.recaudacion11kg),
                ventas15kg: Number(acc.ventas15kg) + Number(curr.contabilidadRecargas.ventas15kg),
                recaudacion15kg: Number(acc.recaudacion15kg) + Number(curr.contabilidadRecargas.recaudacion15kg),
                ventas45kg: Number(acc.ventas45kg) + Number(curr.contabilidadRecargas.ventas45kg),
                recaudacion45kg: Number(acc.recaudacion45kg) + Number(curr.contabilidadRecargas.recaudacion45kg),
                totalCantidad: Number(acc.totalCantidad) + Number(curr.contabilidadRecargas.totalCantidad),
                totalRecaudacion: Number(acc.totalRecaudacion) + Number(curr.contabilidadRecargas.totalRecaudacion),
            }
        }, {
            ventas5kg: 0,
            recaudacion5kg: 0,
            ventas11kg: 0,
            recaudacion11kg: 0,
            ventas15kg: 0,
            recaudacion15kg: 0,
            ventas45kg: 0,
            recaudacion45kg: 0,
            totalCantidad: 0,
            totalRecaudacion: 0
        })

        const sumaTotalEfectivo = ordenesWithMetodoPagos.reduce((acc, curr) => {
            return {
                totalBilletes20: Number(acc.totalBilletes20) + Number(curr.efectivo.totalBilletes20),
                totalBilletes10: Number(acc.totalBilletes10) + Number(curr.efectivo.totalBilletes10),
                totalBilletes5: Number(acc.totalBilletes5) + Number(curr.efectivo.totalBilletes5),
                totalBilletes2: Number(acc.totalBilletes2) + Number(curr.efectivo.totalBilletes2),
                totalBilletes1: Number(acc.totalBilletes1) + Number(curr.efectivo.totalBilletes1),
                monedas: Number(acc.monedas) + Number(curr.efectivo.monedas),
                totalGeneral: Number(acc.totalGeneral) + Number(curr.efectivo.totalGeneral),
            }
        }, {
            totalBilletes20: 0,
            totalBilletes10: 0,
            totalBilletes5: 0,
            totalBilletes2: 0,
            totalBilletes1: 0,
            monedas: 0,
            totalGeneral: 0
        })

        const sumaTotalVales = ordenesWithMetodoPagos.reduce((acc, curr) => {
            return {
                fisico5kg: Number(acc.fisico5kg) + Number(curr.vales.fisico5kg),
                digital5kg: Number(acc.digital5kg) + Number(curr.vales.digital5kg),
                totalCantidadFisicoYDigital5kg: Number(acc.fisico5kg) + Number(curr.vales.fisico5kg) + Number(acc.digital5kg) + Number(curr.vales.digital5kg),
                sumaTotalDigitalYFisico5kg: Number(acc.sumaTotalDigitalYFisico5kg) + Number(curr.vales.sumaTotalDigitalYFisico5kg),
                fisico11kg: Number(acc.fisico11kg) + Number(curr.vales.fisico11kg),
                digital11kg: Number(acc.digital11kg) + Number(curr.vales.digital11kg),
                totalCantidadFisicoYDigital11kg: Number(acc.fisico11kg) + Number(curr.vales.fisico11kg) + Number(acc.digital11kg) + Number(curr.vales.digital11kg),
                sumaTotalDigitalYFisico11kg: Number(acc.sumaTotalDigitalYFisico11kg) + Number(curr.vales.sumaTotalDigitalYFisico11kg),
                fisico15kg: Number(acc.fisico15kg) + Number(curr.vales.fisico15kg),
                digital15kg: Number(acc.digital15kg) + Number(curr.vales.digital15kg),
                totalCantidadFisicoYDigital15kg: Number(acc.fisico15kg) + Number(curr.vales.fisico15kg) + Number(acc.digital15kg) + Number(curr.vales.digital15kg),
                sumaTotalDigitalYFisico15kg: Number(acc.sumaTotalDigitalYFisico15kg) + Number(curr.vales.sumaTotalDigitalYFisico15kg),
                fisico45kg: Number(acc.fisico45kg) + Number(curr.vales.fisico45kg),
                digital45kg: Number(acc.digital45kg) + Number(curr.vales.digital45kg),
                totalCantidadFisicoYDigital45kg: Number(acc.fisico45kg) + Number(curr.vales.fisico45kg) + Number(acc.digital45kg) + Number(curr.vales.digital45kg),
                sumaTotalDigitalYFisico45kg: Number(acc.sumaTotalDigitalYFisico45kg) + Number(curr.vales.sumaTotalDigitalYFisico45kg),
                totalFisico: Number(acc.fisico5kg) + Number(curr.vales.fisico5kg) + Number(acc.fisico11kg) + Number(curr.vales.fisico11kg) + Number(acc.fisico15kg) + Number(curr.vales.fisico15kg) + Number(acc.fisico45kg) + Number(curr.vales.fisico45kg),
                totalDigital: Number(acc.digital5kg) + Number(curr.vales.digital5kg) + Number(acc.digital11kg) + Number(curr.vales.digital11kg) + Number(acc.digital15kg) + Number(curr.vales.digital15kg) + Number(acc.digital45kg) + Number(curr.vales.digital45kg),
                totalVales: Number(acc.totalVales) + Number(curr.vales.totalVales),
                totalSumaVales: Number(acc.totalSumaVales) + Number(curr.vales.totalSumaVales)
            }
        }, {
            fisico5kg: 0,
            digital5kg: 0,
            totalCantidadFisicoYDigital5kg: 0,
            sumaTotalDigitalYFisico5kg: 0,
            fisico11kg: 0,
            digital11kg: 0,
            totalCantidadFisicoYDigital11kg: 0,
            sumaTotalDigitalYFisico11kg: 0,
            fisico15kg: 0,
            digital15kg: 0,
            totalCantidadFisicoYDigital15kg: 0,
            sumaTotalDigitalYFisico15kg: 0,
            fisico45kg: 0,
            digital45kg: 0,
            totalCantidadFisicoYDigital45kg: 0,
            sumaTotalDigitalYFisico45kg: 0,
            totalVales: 0,
            totalSumaVales: 0
        })

        const sumaTotalDescuentosRut = ordenesWithMetodoPagos.reduce((acc, curr) => {
            return acc + Number(curr.descuentoRut.monto)
        }, 0)

        const sumaTotalDescuentos = ordenesWithMetodoPagos.reduce((acc, curr) => {
            return acc + Number(curr.descuentos.monto)
        }, 0)

        const sumaTotalTransbank = ordenesWithMetodoPagos.reduce((acc, curr) => {
            return acc + Number(curr.transbank.monto)
        }, 0)

        const sumaTotalTransferencia = ordenesWithMetodoPagos.reduce((acc, curr) => {
            return acc + Number(curr.transferencias.monto)
        }, 0)

        //funcion para sumar todos los metodos de pago
        const sumaTotalDeTodo = 
        (
            sumaTotalAbonos +
            sumaTotalEfectivo.totalGeneral +
            sumaTotalVales.totalSumaVales +
            sumaTotalDescuentosRut +
            sumaTotalDescuentos +
            sumaTotalTransbank +
            sumaTotalTransferencia
        )

        res.json({
            message: 'Ordenes de reparto con metodo de pago',
            sumaAbonos: sumaTotalAbonos,
            ventaTotalTarros: sumaTotalRecargas,
            totalEfectivo: sumaTotalEfectivo,
            totalVales: sumaTotalVales,
            totalDescuentosRut: sumaTotalDescuentosRut,
            totalDescuentos: sumaTotalDescuentos,
            totalTransbank: sumaTotalTransbank,
            totalTransferencia: sumaTotalTransferencia,
            totalGeneral: sumaTotalDeTodo,
            sobrante: sumaSobrantes
        })

    } catch (error) {
        next(error);
    }
}

const getallMetodoPagosInOrdenDeRepartoByAdministradorIdBetweenDates = async (req, res, next) => {
    const { fechaInicio, fechaFin, administradorId } = req.params;

    try {

        let ordenesDeReparto
        
        if(administradorId === 'all'){
            if(!fechaFin || fechaFin === 'undefined' || fechaFin === null){
                ordenesDeReparto = await OrdenDeReparto.findAll({
                    where: {
                        fecha: fechaInicio,
                        rendida : true
                    }
                })
            }else{
                ordenesDeReparto = await OrdenDeReparto.findAll({
                    where: {
                        fecha: {
                            [Op.between]: [fechaInicio, fechaFin]
                        },
                        rendida : true
                    }
                })
            }
        }else{
            if(!fechaFin || fechaFin === 'undefined' || fechaFin === null){
                ordenesDeReparto = await OrdenDeReparto.findAll({
                    where: {
                        fecha: fechaInicio,
                        cuadradoPor: administradorId,
                        rendida : true
                    }
                })
            }else{
                ordenesDeReparto = await OrdenDeReparto.findAll({
                    where: {
                        fecha: {
                            [Op.between]: [fechaInicio, fechaFin]
                        },
                        cuadradoPor: administradorId,
                        rendida : true
                    }
                })
            }
        }

        const ordenesWithMetodoPagos = await Promise.all(ordenesDeReparto.map(async orden => {
            const metodoPago = await orden.getMetodoPagos()

            const descuentoRut = await DescuentoRut.findOne({
                where: {
                    fk_MetodoPagosID: metodoPago[0].id
                }
            })

            const descuentos = await Descuentos.findOne({
                where: {
                    fk_MetodoPagosID: metodoPago[0].id
                }
            })

            const transbank = await Transbank.findOne({
                where: {
                    fk_MetodoPagosID: metodoPago[0].id
                }
            })

            const transferencias = await Transferencias.findOne({
                where: {
                    fk_MetodoPagosID: metodoPago[0].id
                }
            })

            const sumaAbonos = await Abonos.sum('monto', {
                where: {
                    fk_MetodoPagosID: metodoPago[0].id
                }
            })

            const contabilidadRecargas = await orden.getContabilidadRecarga();

            const efectivo = await Efectivo.findOne({
                where: {
                    fk_MetodoPagosID: metodoPago[0].id
                }
            })

            const vales = await Vales.findOne({
                where: {
                    fk_MetodoPagosID: metodoPago[0].id
                }
            })

            const gastos = await Gastos.findOne({
                where: {
                    fk_MetodoPagosID: metodoPago[0].id
                }
            })

            return {
                sumaAbonos,
                contabilidadRecargas,
                efectivo,
                vales,
                descuentoRut,
                descuentos,
                transbank,
                transferencias,
                gastos
            }
        }))

        const sumaSobrantes = ordenesDeReparto.reduce((acc, curr) => {
            return Number(acc) + Number(curr.sobrante)
        }, 0)

        const sumaTotalAbonos = ordenesWithMetodoPagos.reduce((acc, curr) => {
            return acc + Number(curr.sumaAbonos)
        }, 0)

        const sumaTotalRecargas = ordenesWithMetodoPagos.reduce((acc, curr) => {
            return {
                ventas5kg: Number(acc.ventas5kg) + Number(curr.contabilidadRecargas.ventas5kg),
                recaudacion5kg: Number(acc.recaudacion5kg) + Number(curr.contabilidadRecargas.recaudacion5kg),
                ventas11kg: Number(acc.ventas11kg) + Number(curr.contabilidadRecargas.ventas11kg),
                recaudacion11kg: Number(acc.recaudacion11kg) + Number(curr.contabilidadRecargas.recaudacion11kg),
                ventas15kg: Number(acc.ventas15kg) + Number(curr.contabilidadRecargas.ventas15kg),
                recaudacion15kg: Number(acc.recaudacion15kg) + Number(curr.contabilidadRecargas.recaudacion15kg),
                ventas45kg: Number(acc.ventas45kg) + Number(curr.contabilidadRecargas.ventas45kg),
                recaudacion45kg: Number(acc.recaudacion45kg) + Number(curr.contabilidadRecargas.recaudacion45kg),
                totalCantidad: Number(acc.totalCantidad) + Number(curr.contabilidadRecargas.totalCantidad),
                totalRecaudacion: Number(acc.totalRecaudacion) + Number(curr.contabilidadRecargas.totalRecaudacion),
            }
        }, {
            ventas5kg: 0,
            recaudacion5kg: 0,
            ventas11kg: 0,
            recaudacion11kg: 0,
            ventas15kg: 0,
            recaudacion15kg: 0,
            ventas45kg: 0,
            recaudacion45kg: 0,
            totalCantidad: 0,
            totalRecaudacion: 0
        })

        const sumaTotalEfectivo = ordenesWithMetodoPagos.reduce((acc, curr) => {
            return {
                totalBilletes20: Number(acc.totalBilletes20) + Number(curr.efectivo.totalBilletes20),
                totalBilletes10: Number(acc.totalBilletes10) + Number(curr.efectivo.totalBilletes10),
                totalBilletes5: Number(acc.totalBilletes5) + Number(curr.efectivo.totalBilletes5),
                totalBilletes2: Number(acc.totalBilletes2) + Number(curr.efectivo.totalBilletes2),
                totalBilletes1: Number(acc.totalBilletes1) + Number(curr.efectivo.totalBilletes1),
                monedas: Number(acc.monedas) + Number(curr.efectivo.monedas),
                totalGeneral: Number(acc.totalGeneral) + Number(curr.efectivo.totalGeneral),
            }
        }, {
            totalBilletes20: 0,
            totalBilletes10: 0,
            totalBilletes5: 0,
            totalBilletes2: 0,
            totalBilletes1: 0,
            monedas: 0,
            totalGeneral: 0
        })

        const sumaTotalVales = ordenesWithMetodoPagos.reduce((acc, curr) => {
            return {
                fisico5kg: Number(acc.fisico5kg) + Number(curr.vales.fisico5kg),
                digital5kg: Number(acc.digital5kg) + Number(curr.vales.digital5kg),
                totalCantidadFisicoYDigital5kg: Number(acc.fisico5kg) + Number(curr.vales.fisico5kg) + Number(acc.digital5kg) + Number(curr.vales.digital5kg),
                sumaTotalDigitalYFisico5kg: Number(acc.sumaTotalDigitalYFisico5kg) + Number(curr.vales.sumaTotalDigitalYFisico5kg),
                fisico11kg: Number(acc.fisico11kg) + Number(curr.vales.fisico11kg),
                digital11kg: Number(acc.digital11kg) + Number(curr.vales.digital11kg),
                totalCantidadFisicoYDigital11kg: Number(acc.fisico11kg) + Number(curr.vales.fisico11kg) + Number(acc.digital11kg) + Number(curr.vales.digital11kg),
                sumaTotalDigitalYFisico11kg: Number(acc.sumaTotalDigitalYFisico11kg) + Number(curr.vales.sumaTotalDigitalYFisico11kg),
                fisico15kg: Number(acc.fisico15kg) + Number(curr.vales.fisico15kg),
                digital15kg: Number(acc.digital15kg) + Number(curr.vales.digital15kg),
                totalCantidadFisicoYDigital15kg: Number(acc.fisico15kg) + Number(curr.vales.fisico15kg) + Number(acc.digital15kg) + Number(curr.vales.digital15kg),
                sumaTotalDigitalYFisico15kg: Number(acc.sumaTotalDigitalYFisico15kg) + Number(curr.vales.sumaTotalDigitalYFisico15kg),
                fisico45kg: Number(acc.fisico45kg) + Number(curr.vales.fisico45kg),
                digital45kg: Number(acc.digital45kg) + Number(curr.vales.digital45kg),
                totalCantidadFisicoYDigital45kg: Number(acc.fisico45kg) + Number(curr.vales.fisico45kg) + Number(acc.digital45kg) + Number(curr.vales.digital45kg),
                sumaTotalDigitalYFisico45kg: Number(acc.sumaTotalDigitalYFisico45kg) + Number(curr.vales.sumaTotalDigitalYFisico45kg),
                totalFisico: Number(acc.fisico5kg) + Number(curr.vales.fisico5kg) + Number(acc.fisico11kg) + Number(curr.vales.fisico11kg) + Number(acc.fisico15kg) + Number(curr.vales.fisico15kg) + Number(acc.fisico45kg) + Number(curr.vales.fisico45kg),
                totalDigital: Number(acc.digital5kg) + Number(curr.vales.digital5kg) + Number(acc.digital11kg) + Number(curr.vales.digital11kg) + Number(acc.digital15kg) + Number(curr.vales.digital15kg) + Number(acc.digital45kg) + Number(curr.vales.digital45kg),
                totalVales: Number(acc.totalVales) + Number(curr.vales.totalVales),
                totalSumaVales: Number(acc.totalSumaVales) + Number(curr.vales.totalSumaVales)
            }
        }, {
            fisico5kg: 0,
            digital5kg: 0,
            totalCantidadFisicoYDigital5kg: 0,
            sumaTotalDigitalYFisico5kg: 0,
            fisico11kg: 0,
            digital11kg: 0,
            totalCantidadFisicoYDigital11kg: 0,
            sumaTotalDigitalYFisico11kg: 0,
            fisico15kg: 0,
            digital15kg: 0,
            totalCantidadFisicoYDigital15kg: 0,
            sumaTotalDigitalYFisico15kg: 0,
            fisico45kg: 0,
            digital45kg: 0,
            totalCantidadFisicoYDigital45kg: 0,
            sumaTotalDigitalYFisico45kg: 0,
            totalVales: 0,
            totalSumaVales: 0
        })

        const sumaTotalDescuentosRut = ordenesWithMetodoPagos.reduce((acc, curr) => {
            return acc + Number(curr.descuentoRut.monto)
        }, 0)

        const sumaTotalDescuentos = ordenesWithMetodoPagos.reduce((acc, curr) => {
            return acc + Number(curr.descuentos.monto)
        }, 0)

        const sumaTotalTransbank = ordenesWithMetodoPagos.reduce((acc, curr) => {
            return acc + Number(curr.transbank.monto)
        }, 0)

        const sumaTotalTransferencia = ordenesWithMetodoPagos.reduce((acc, curr) => {
            return acc + Number(curr.transferencias.monto)
        }, 0)

        const sumaGastos = ordenesWithMetodoPagos.reduce((acc, curr) => {
            return acc + Number(curr.gastos.monto)
        }, 0)

        //funcion para sumar todos los metodos de pago
        const sumaTotalDeTodo = 
        (
            sumaTotalAbonos +
            sumaTotalEfectivo.totalGeneral +
            sumaTotalVales.totalSumaVales +
            sumaTotalDescuentosRut +
            sumaTotalDescuentos +
            sumaTotalTransbank +
            sumaTotalTransferencia +
            sumaGastos
        )

        res.json({
            message: 'Ordenes de reparto con metodo de pago',
            sumaAbonos: sumaTotalAbonos,
            ventaTotalTarros: sumaTotalRecargas,
            totalEfectivo: sumaTotalEfectivo,
            totalVales: sumaTotalVales,
            totalDescuentosRut: sumaTotalDescuentosRut,
            totalDescuentos: sumaTotalDescuentos,
            totalTransbank: sumaTotalTransbank,
            totalTransferencia: sumaTotalTransferencia,
            totalGeneral: sumaTotalDeTodo,
            sobrante: sumaSobrantes,
            gastos: sumaGastos
        })

    } catch (error) {
        next(error);
    }
}

module.exports = {
    updateAbono,
    getAllMetodoPagosInOrdenDeRepartoBetweenDates,
    getallMetodoPagosInOrdenDeRepartoByAdministradorIdBetweenDates
}
