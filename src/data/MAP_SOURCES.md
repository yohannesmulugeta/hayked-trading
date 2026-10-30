# World map and coffee-origin markers

Country paths are derived from Natural Earth, 1:110m Admin 0 Countries, downloaded on 30 October 2026 from the maintainers' repository:

https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson

Natural Earth data is public domain, including commercial use and modification:

https://www.naturalearthdata.com/about/terms-of-use/

The coordinate projection is equirectangular: x = (longitude + 180) / 360 × 1200; y = (90 − latitude) / 180 × 600 + 25. Antarctica is omitted. `world-map.json` retains simplified SVG paths and country identifiers; it is bundled locally and does not call external map or tile APIs.

Coffee origins are approximate orientation markers for established Ethiopian coffee trade areas. They are not administrative boundary polygons, farms, stock locations or claims that Hayked currently supplies these origins. The separate, unverified example content in `src/content/origins` has not been promoted to confirmed offers. Each map enquiry asks the Hayked team to confirm availability and specifications.

Origin names (Yirgacheffe, Sidama/Sidamo, Guji, Jimma and Harar) are documented in the Ethiopian Coffee and Tea Authority's coffee booklet, indexed at https://ethiocta.gov.et/wp-content/uploads/2022/09/ECTA-new-Coffee-Booklet-.pdf. This historical URL was indexed but not directly accessible during this update, so the live UI does not link to it, publish tasting scores or repeat historical administrative-region designations.
