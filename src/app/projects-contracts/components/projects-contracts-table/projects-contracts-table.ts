import { Component, effect, inject, input, signal } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import * as XLSX from 'xlsx';
import { LowerCasePipe, CurrencyPipe, DatePipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Contrato } from '../../interfaces/projects-contracts.interface';

interface TableColumn {
  key: string;
  label: string;
  pipe?: 'currency' | 'date' | 'lowercase';
  class?: string;
}

interface ColumnGroup {
  name: string;
  columns: TableColumn[];
}

@Component({
  selector: 'projects-contracts-table',
  standalone: true,
  imports: [CommonModule, LowerCasePipe, CurrencyPipe, DatePipe, FormsModule],
  templateUrl: './projects-contracts-table.html',
})
export class ProjectsContractsTable {
  private authService = inject(AuthService);
  public isAdmin = this.authService.isAdmin;

  contractors = input.required<Contrato[]>();
  baseTitle: string = 'Info.';

  private readonly DEFAULT_COLUMNS = ['numero_contrato', 'fecha_inicio', 'fecha_terminacion', 'objeto', 'valor', 'proyecto.proyecto'];

  public columnGroups: ColumnGroup[] = [
    {
      name: `${this.baseTitle}Contrato`,
      columns: [
        { key: 'numero_contrato', label: 'No. Contrato', class: 'fw-bold' },
        { key: 'no_radicado_adquisiciones', label: 'No. Radicado' },
        { key: 'objeto', label: 'Objeto', pipe: 'lowercase' },
        { key: 'valor', label: 'Valor', pipe: 'currency' },
      ]
    },
    {
      name: `${this.baseTitle}Proyecto`,
      columns: [
        { key: 'proyecto.proyecto', label: 'Proyecto' },
        { key: 'proyecto.codigoSicof', label: 'Cód.SICOF' },
        { key: 'proyecto.nombreProyecto', label: 'Nombre proyecto' },
        { key: 'proyecto.numeroConvernio', label: 'Numero proyecto' },
        { key: 'proyecto.referenciaExterna', label: 'Referencia Externa' },
      ]
    },
    {
      name: `${this.baseTitle}Contratista`,
      columns: [
        { key: 'contratista.nombre', label: 'Contratista' },
        { key: 'contratista.tipo_persona', label: 'Tipo persona' },
        { key: 'contratista.cedula_nit', label: 'Cedula o Nit' },
        { key: 'contratista.email', label: 'Correo' },
      ]
    },
    {
      name: `${this.baseTitle}Cronología`,
      columns: [
        { key: 'fecha_inicio', label: 'Inicio', pipe: 'date' },
        { key: 'fecha_terminacion', label: 'Fin', pipe: 'date' },
      ]
    },
    {
      name: `${this.baseTitle}tipo contrato`,
      columns: [
        { key: 'tipoContrato.tipo_contrato', label: 'Tipo contrato', },
        { key: 'tipoContrato.abr_tipo', label: 'abr tipo', },

      ]
    },
    {
      name: `${this.baseTitle}categoria del gasto`,
      columns: [
        { key: 'categoriasGasto.categoria_gasto', label: 'categoria del gasto' },
        { key: 'categoriasGasto.categoria_gasto_GCF', label: 'gcf', },

      ]
    },
    {
      name: `${this.baseTitle}metodo adquisicion`,
      columns: [
        { key: 'metodosAdquisicion.metodo_adquisicion', label: 'metodo adquisicion' },
      ]
    },
    {
      name: `${this.baseTitle}poliza contraloria`,
      columns: [
        { key: 'tipoPolizaContraloria.tipo_póliza', label: 'tipo_póliza' },
      ]
    },
    {
      name: `${this.baseTitle}supervisor`,
      columns: [
        { key: 'supervisor.responsable', label: 'Coordinador responsable' },
        { key: 'supervisor.cédula', label: 'Coordinador cedula' },
        { key: 'supervisor.celular', label: 'Coordinador celular' },
        { key: 'supervisor.email', label: 'Coordinador email' },
        { key: 'supervisor.area', label: 'Coordinador area' },
      ]
    },
    {
      name: `${this.baseTitle}ordenador gasto`,
      columns: [
        { key: 'ordenadorGasto.responsable', label: 'Ordenador gasto responsable' },
        { key: 'ordenadorGasto.cédula', label: 'Ordenador gasto cedula' },
        { key: 'ordenadorGasto.celular', label: 'Ordenador gasto celular' },
        { key: 'ordenadorGasto.email', label: 'Ordenador gasto email' },
        { key: 'ordenadorGasto.area', label: 'Ordenador gasto area' },
      ]
    },
    {
      name: `${this.baseTitle}responsable digitacion`,
      columns: [
        { key: 'responsableDigitacion.responsable', label: 'responsable digitacion' },
        { key: 'responsableDigitacion.cédula', label: 'responsable digitacion cedula' },
        { key: 'responsableDigitacion.celular', label: 'responsable digitacion celular' },
        { key: 'responsableDigitacion.email', label: 'responsable digitacion email' },
        { key: 'responsableDigitacion.area', label: 'responsable digitacion area' },
      ]
    },
       {
      name: `${this.baseTitle}responsable minuta`,
      columns: [
        { key: 'responsableMinuta.responsable', label: 'responsable Minuta' },
        { key: 'responsableMinuta.cédula', label: 'responsable minuta cedula' },
        { key: 'responsableMinuta.celular', label: 'responsable minuta celular' },
        { key: 'responsableMinuta.email', label: 'responsable minuta email' },
        { key: 'responsableMinuta.area', label: 'responsable minuta area' },
      ]
    },
  ];

  public visibleColumns = signal<string[]>(this.loadColumns());

  constructor() {
    effect(() => {
      localStorage.setItem('user_table_columns', JSON.stringify(this.visibleColumns()));
    });
  }

  private loadColumns(): string[] {
    const saved = localStorage.getItem('user_table_columns');
    return saved ? JSON.parse(saved) : this.DEFAULT_COLUMNS;
  }

  // Resuelve 'proyecto.proyecto' o 'valor'
  getNestedValue(obj: any, path: string): any {
    if (!obj || !path) return null;
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

  public get renderedColumns(): TableColumn[] {
    return this.columnGroups
      .flatMap(group => group.columns)
      .filter(col => this.visibleColumns().includes(col.key));
  }

  isColumnVisible(key: string): boolean {
    return this.visibleColumns().includes(key);
  }

  toggleColumn(key: string) {
    this.visibleColumns.update(cols =>
      cols.includes(key) ? cols.filter(c => c !== key) : [...cols, key]
    );
  }

  resetColumns() {
    this.visibleColumns.set([...this.DEFAULT_COLUMNS]);
  }

  isGroupFull(group: ColumnGroup): boolean {
    return group.columns.every(c => this.isColumnVisible(c.key));
  }

  isGroupPartial(group: ColumnGroup): boolean {
    const selected = group.columns.filter(c => this.isColumnVisible(c.key)).length;
    return selected > 0 && selected < group.columns.length;
  }

  toggleGroup(group: ColumnGroup, event: any) {
    const keys = group.columns.map(c => c.key);
    if (event.target.checked) {
      this.visibleColumns.update(cols => [...new Set([...cols, ...keys])]);
    } else {
      this.visibleColumns.update(cols => cols.filter(c => !keys.includes(c)));
    }
  }

  isObject(val: any): boolean {
    return val !== null && typeof val === 'object' && !Array.isArray(val);
  }

  stripHtml(text: any): string {
    if (!text) return '-';
    return text.toString().replace(/<[^>]*>/g, '').trim();
  }

  exportToExcel() {
    const dataToExport = this.contractors().map(contractor => {
      const row: any = {};
      this.renderedColumns.forEach(col => {
        let val = this.getNestedValue(contractor, col.key);
        if (col.pipe === 'date' && val) val = new Date(val).toLocaleDateString();
        if (typeof val === 'string' && val.includes('<')) val = this.stripHtml(val);
        row[col.label] = val ?? '-';
      });
      return row;
    });

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Contratos');
    XLSX.writeFile(wb, `Reporte_Contratos_${new Date().getTime()}.xlsx`);
  }
}