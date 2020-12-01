import {mount} from '@vue/test-utils';
import { config } from '@vue/test-utils'
import Vue from 'vue'
import PriceCalculation from '@/views/Packages/PriceCalculation.vue';
config.showDeprecationWarnings = false;
Vue.config.silent = true;

describe('Tests de front para PriceCalculation.vue', () => {
  it('Arranque del test', () => {
    expect(true).toBeTruthy();
  });
  it('Se crea una instancia de PriceCalculation.vue', () => {
    const wrapper = mount(PriceCalculation);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('Se muestra el precio al pulsar el botón', () => {
    const wrapper = mount(PriceCalculation);
    const showPriceMock = jest.fn();
    wrapper.setMethods({showPrice: showPriceMock });
    wrapper.find('b-button').trigger('click');
    expect(showPriceMock).toHaveBeenCalled(); 
  });

  it('Importe a pagar mostrado es el correcto', () => {
    const wrapper = mount(PriceCalculation);
    wrapper.setData({
            form: {
                origen: {
                    value: "calleTest1",
                    altitud: "1",
                    longitud: "1",
                },
                destino: {
                    value: "calleTest2",
                    altitud: "",
                    longitud: "",
                },
                naturaleza: {
                  value: "Frágil",
              },
                peso: {
                    value: "5",
                    price: "4.74" //1kg= 3,54 € + comision
                },
                size: {
                    value: {
                        ancho: "2",
                        largo: "3",
                        alto: "4",
                    },
                }
            },
        });
    wrapper.vm.calcularPrecio();
    expect(wrapper.vm.calcularPrecio()).toBe('23.70');
  });
 
});