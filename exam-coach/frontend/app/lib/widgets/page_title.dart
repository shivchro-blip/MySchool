import 'package:flutter/material.dart';
import '../config/theme.dart';

class PageTitle extends StatelessWidget {
  final String text;
  const PageTitle(this.text, {super.key});

  @override
  Widget build(BuildContext context) {
    return Text(text, style: AppTheme.pageTitleStyle(context));
  }
}
