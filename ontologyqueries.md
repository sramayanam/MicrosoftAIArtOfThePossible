What are the top origin airports to DFW by annual number of flights
What is the average number of passengers per flight from the top origin airports to DFW?
Which airports destinations have the highest centrality (i.e., are most "influential" or connected) within the entire flight network?




# Airlines Ontology — Example Business Queries



Sample query buckets and example user questions the agent can answer, especially in the context of route performance to DFW.

---

## 1. Route Performance

- What are the top origin airports to DFW by annual number of flights?
- What is the average number of passengers per flight from the top origin airports to DFW?
- Which routes to DFW have the highest average fare per passenger (either direct or connecting)?
- Which routes have the highest or lowest average price per mile?

## 2. Revenue & Pricing

- Which origin airports generated the highest total route revenue to DFW?
- What are the average direct and connecting ticket prices for routes to DFW?
- Which routes to DFW are the most/least profitable (by route revenue)?

## 3. Competitive Analysis

- How many carriers (major and regional) serve each origin airport route to DFW?
- Which DFW routes face the most competition (highest `competing_carrier_count`)?

## 4. Network Coverage & Connectivity

- Which airports have only connecting services to DFW versus direct service?
- What is the average routing efficiency (actual miles flown vs. shortest route) for routes to DFW?
- Which are the longest and shortest nonstop routes to DFW (by `average_nonstop_distance_miles`)?

## 5. Market Segmentation

- Which origin airports send the most direct vs. connecting passengers to DFW?
- What is the ratio of connecting to direct passengers for top routes?

## 6. Temporal Service Span

- What is the earliest year a route to DFW was served from a given origin?
- Which routes have operated the longest to DFW?

---

## Example Query Formats

> "Show the top 5 routes to DFW by total route revenue."

> "Which 3 airports have the highest average direct ticket price flying to DFW?"

> "List all origin airports with more than 500,000 annual passengers to DFW."

> "What is the average passengers per flight from ATL to DFW?"

> "Which DFW route is served by the most airlines?"

> "Show non-stop vs. connecting passenger volume breakdown for AUS to DFW."

> "What is the average price per mile for top 10 routes to DFW?"

Great question! Since the underlying data appears to be graph-based—meaning it stores entities like airports and routes, with rich relationships and properties—here are some complex, graph-driven queries you could consider. These make use of relationships, aggregations, and path-finding capabilities often found in graph databases:

Example Complex Graph-Based Questions
Hub Connectivity:

What indirect (multi-leg) connections exist from a given airport (e.g., DFW) to all other airports, and what are the shortest or most efficient routes based on aggregate distance or layover minimization?
Carrier Competition Network:

For a specific airport, which other airports are reachable through routes covered by multiple carriers, and how does competition affect pricing or passenger volume?
Community Detection:

Can we identify clusters or communities of airports that share strong travel links (based on flight volume or frequency)? This could help detect regional hubs or tightly connected airport networks.
Centrality Analysis:

Which airports have the highest centrality (i.e., are most "influential" or connected) within the entire flight network? This could be based on metrics like betweenness or degree centrality.
Ripple Effects:

If an airport (like DFW) experiences disruptions (e.g., closure or major delay), which other airports or routes are most affected, either directly or as part of a cascading delay effect?
Multi-hop Routing for Price Optimization:

For travelers seeking the lowest total fare or price per mile, what is the best (possibly connecting) route between two endpoints?
Route Evolution Over Time:

How has the direct and indirect network connectivity of a major airport (e.g., DFW) evolved over the past years? Show changes in route volume, carrier count, or new destinations using temporal graph queries.
Competitive Dynamics:

For any given route or destination (such as DFW), which airline carriers have added or dropped service in the past year? How has this affected passenger demand or prevalence of direct vs. connecting flights?
Detecting Bottlenecks:

Which single node (airport) or edge (route) would cause the most disruption if removed? This question seeks the "critical path" or bottleneck in the network.
Inter-Carrier Code Sharing:

Which airports are most frequently involved in code-sharing agreements (if available), resulting in extended reach through partner networks?
How the Graph Helps
Graph-based queries allow for natural exploration of relationships (e.g., connecting flights, competing carriers) and aggregate, multistep traversals (e.g., multi-hop itineraries).
They can model disruption propagations, competitive dynamics, and price/performance trade-offs across the whole network.
Temporal and attribute-based filtering make it possible to answer questions about how the network changes over time, or what subnetworks exist for particular travel seasons or carriers.
Let me know if you want to see the answer to any of these examples, or if you have a specific scenario in mind!