import 'package:flutter/material.dart';
import '../../../config/theme.dart';
import '../../../models/exam_paper_model.dart';

class TableBlock extends StatelessWidget {
  final ExamBlock block;
  const TableBlock({super.key, required this.block});

  @override
  Widget build(BuildContext context) {
    final headers = block.headers ?? [];
    final rows = block.rows ?? [];
    final border = TableBorder.all(color: AppTheme.borderOf(context), width: 0.8);

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Table(
        border: border,
        children: [
          if (headers.isNotEmpty)
            TableRow(
              decoration: BoxDecoration(color: AppTheme.brandLightOf(context)),
              children: headers.map((h) => _cell(context, h, bold: true)).toList(),
            ),
          ...rows.map((row) => TableRow(
            children: row.map((cell) => _cell(context, cell)).toList(),
          )),
        ],
      ),
    );
  }

  Widget _cell(BuildContext context, String text, {bool bold = false}) {
    return Padding(
      padding: const EdgeInsets.all(6),
      child: Text(
        text,
        style: TextStyle(
          fontSize: 10,
          fontWeight: bold ? FontWeight.w600 : FontWeight.normal,
          color: AppTheme.textOf(context),
        ),
      ),
    );
  }
}
