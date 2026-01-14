export default function IletisimPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">📞 İletişim</h1>

      <p className="mb-4">
        Carvix ile ilgili her türlü soru, öneri ve destek talepleriniz için bizimle iletişime geçebilirsiniz.
      </p>

      <p className="mb-2">
        <strong>E-posta:</strong>{" "}
        <a href="mailto:info@carvix.site" className="text-blue-500 hover:underline">
          info@carvix.site
        </a>
      </p>

      <p className="mb-2">
        <strong>Telefon:</strong>{" "}
        <a href="tel:+905335239954" className="text-blue-500 hover:underline">
          0533 523 99 54
        </a>
      </p>

      <p className="mb-2">
        <strong>Adres:</strong> Sakarya, Adapazarı Merkez
      </p>

      <p className="mt-6 text-gray-600">
        Destek talepleriniz en kısa sürede yanıtlanacaktır.
      </p>
    </div>
  );
}
