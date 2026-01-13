export interface MenuOption {
  icon: string;
  label: string;
  //route: string;  // ← Correcto: con 'e' al final
  subLAbel: string;
  pages?: string[];
}
