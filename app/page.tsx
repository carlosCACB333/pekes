import { text } from "@/components/primitives";
import { Link } from "@nextui-org/link";
export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-16 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1>
          <span className={text({ size: "xl" })}>Ayuda para los más&nbsp;</span>
          <span className={text({ size: "xl", color: "blue" })}>
            Pekes &nbsp;
          </span>
          <span className={text({ size: "xl" })}>de la casa&nbsp;</span>
        </h1>
        <h2 className={text({ color: "disabled" })}>
          Prueba nuestras herramientas impulsadas por IA para ayudar a los más
          pequeños a aprender divirtiéndose.
        </h2>
      </div>

      <div>
        <h2 className={text({ size: "lg", font: "bold" })}>
          Generador de historietas
        </h2>
        <p className={text({ color: "disabled" })}>
          Crea tus propias historietas con IA a partir de un texto.
        </p>
        <br />
        <Link href="/comic">¡Prueba ahora!</Link>
      </div>
    </section>
  );
}
