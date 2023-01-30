import classNames from "classnames";

interface StatusBadgeProps {
  status: "VALIDATING" | "PAID" | "UNPAID";
}

export const StatusBadge: React.FC<StatusBadgeProps> = (props) => {
  const { status } = props;

  return (
    <div
      className={classNames(
        "flex h-fit items-center gap-2 rounded-full px-3 py-2",
        status === "VALIDATING" && "bg-yellow-50 text-yellow-500",
        status === "PAID" && "bg-green-50 text-green-500",
        status === "UNPAID" && "bg-red-50 text-red-500",
      )}
    >
      <p className="text-sm font-medium">
        {status === "VALIDATING"
          ? "Validando"
          : status === "PAID"
          ? "Pagado"
          : "Sin pagar"}
      </p>
    </div>
  );
};
