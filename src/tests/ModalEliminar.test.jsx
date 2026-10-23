import { render, screen, fireEvent } from "@testing-library/react";
import ModalEliminar from "../components/admin/ModalEliminar";

describe("ModalEliminar (props y eventos)", () => {
  it("muestra el título y el mensaje que recibe por props", () => {
    render(
      <ModalEliminar titulo="Eliminar producto" onConfirmar={() => {}} onCancelar={() => {}}>
        ¿Seguro que quieres eliminarlo?
      </ModalEliminar>,
    );

    expect(screen.getByText("Eliminar producto")).toBeTruthy();
    expect(screen.getByText("¿Seguro que quieres eliminarlo?")).toBeTruthy();
  });

  it("no se muestra si no recibe mensaje", () => {
    const { container } = render(<ModalEliminar titulo="Eliminar" onConfirmar={() => {}} onCancelar={() => {}} />);

    expect(container.firstChild).toBeNull();
  });

  it("llama a onConfirmar al presionar 'Sí, eliminar'", () => {
    const onConfirmar = jasmine.createSpy(); // función falsa (mock) para saber si fue llamada
    render(
      <ModalEliminar titulo="Eliminar" onConfirmar={onConfirmar} onCancelar={() => {}}>
        Mensaje
      </ModalEliminar>,
    );

    fireEvent.click(screen.getByText("Sí, eliminar"));

    expect(onConfirmar).toHaveBeenCalledTimes(1);
  });

  it("llama a onCancelar al presionar 'Cancelar'", () => {
    const onCancelar = jasmine.createSpy();
    render(
      <ModalEliminar titulo="Eliminar" onConfirmar={() => {}} onCancelar={onCancelar}>
        Mensaje
      </ModalEliminar>,
    );

    fireEvent.click(screen.getByText("Cancelar"));

    expect(onCancelar).toHaveBeenCalledTimes(1);
  });
});
