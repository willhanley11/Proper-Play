export function ComingSoon({ feature }) {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{feature}</h2>
      <p className="text-xl text-gray-600 mb-8">This feature is coming soon!</p>
      <div className="w-24 h-1 bg-orange-500 rounded-full"></div>
    </div>
  )
}
