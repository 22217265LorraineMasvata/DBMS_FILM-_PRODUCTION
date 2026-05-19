import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  change?: number
  changeType?: "increase" | "decrease" | "neutral"
  icon?: LucideIcon
  description?: string
  className?: string
  trend?: { value: number; isPositive: boolean }
}

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  description,
  className,
  trend,
}: StatCardProps) {
  // Support both change/changeType and trend prop patterns
  const effectiveChange = trend ? trend.value : change
  const effectiveChangeType = trend 
    ? (trend.isPositive ? "increase" : "decrease") 
    : changeType

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <div className="h-8 w-8 rounded-md bg-primary/10 p-1.5 text-primary">
            <Icon className="h-full w-full" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(effectiveChange !== undefined || description) && (
          <div className="mt-1 flex items-center gap-1 text-xs">
            {effectiveChange !== undefined && (
              <>
                {effectiveChangeType === "increase" && (
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                )}
                {effectiveChangeType === "decrease" && (
                  <TrendingDown className="h-3 w-3 text-destructive" />
                )}
                {effectiveChangeType === "neutral" && (
                  <Minus className="h-3 w-3 text-muted-foreground" />
                )}
                <span
                  className={cn(
                    effectiveChangeType === "increase" && "text-emerald-500",
                    effectiveChangeType === "decrease" && "text-destructive",
                    effectiveChangeType === "neutral" && "text-muted-foreground"
                  )}
                >
                  {effectiveChange > 0 ? "+" : ""}
                  {effectiveChange}%
                </span>
              </>
            )}
            {description && (
              <span className="text-muted-foreground">{description}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
