export function LocationWidget() {
    const [location, setLocation] = useState<LocationData | null>(null)
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState("New Delhi")
  
    const handleSearch = async () => {
      try {
        setLoading(true)
        const loc = await fetchLocationData(query)
        setLocation(loc)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
  
    useEffect(() => {
      handleSearch()
    }, [])
  
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Current Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              className="border p-1 w-full rounded text-sm"
              placeholder="Search any location in India..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="bg-primary text-white px-3 rounded text-sm"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? "..." : "Go"}
            </button>
          </div>
  
          {location && (
            <>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{location.address}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Lat: {location.latitude.toFixed(4)}, Long: {location.longitude.toFixed(4)}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    )
  }
  